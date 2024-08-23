import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import { router } from '../api';
import config from '../config';

export default {
  load: async (app: express.Application): Promise<express.Application> => {
    console.log('Loading Express...');

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      express.json()(req, res, next);
    });

    app.use(cors(config.cors));
    app.use('/v1', router);

    const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
      const status = error.status || 500;
      console.log('tenemos error');
      if (error instanceof SyntaxError) response.status(status).send(error.message);
      else next();
    };

    app.use(errorHandler);

    return app;
  }
};
