import express from 'express';
import expressLoader from './express';
import mongoLoader from './mongo';

export default {
  init: async (appToStart: express.Application): Promise<express.Application> => {
    const startedApp = await expressLoader.load(appToStart);
    console.log('Express Loaded!');

    await mongoLoader.load();
    console.log('Mongo Atlas Connected!');

    return startedApp;
  }
};
