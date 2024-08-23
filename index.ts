import app from './src/app';
import config from './src/config';

const SERVER_PORT = config.server.port;

app.start(SERVER_PORT);
