import express from 'express';
import http from 'http';
import loaders from './loaders';
import { Port } from './types';

const app = express();

export default {
  start: async (port: Port): Promise<void> => {
    console.clear();
    console.log('Loading application...');

    await loaders.init(app);

    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server listening on port ${port}\n`);
    });
  }
};
