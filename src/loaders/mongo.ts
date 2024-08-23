import mongoose from 'mongoose';
import config from '../config';

export default {
  load: async (): Promise<void> => {
    console.log('Connecting To Mongo Atlas Database...');

    try {
      const mongoURI = config.mongo.uri;

      if (!mongoURI) {
        throw new Error('Mongo URI not found in .env file');
      }

      await mongoose.connect(mongoURI);
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error on mongo.ts file: ${e.message ?? 'Unknown error'}`);
      } else {
        console.error(`Error on mongo.ts file: ${e}`);
      }
    }
  }
};
