import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes';
import config from './services/config';

const app = express();

const json = bodyParser.json();

app.use(json);

app.use(
  cors({
    credentials: true,
    origin: [config.appUrl],
  })
);

app.use('/', routes);

export default app;
