import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const nodeEnv = process.env['NODE_ENV'] || 'production';
const devMode = nodeEnv !== 'production';

const corsOption: CorsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default {
  server: {
    port: process.env['PORT'] || 3000,
    nodeEnv
  },

  mongo: {
    uri: process.env['MONGO_URI']
  },

  cors: corsOption,

  jwt: {
    secret: process.env['JWT_KEY']
  }
};
