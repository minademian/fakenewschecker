import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { routes } from './routes';
import config from './services/config';
import { googleAuth } from './middlewares/google.middleware';

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: [config.appUrl],
  })
);

app.use(`/${config.apiPrefix}`, googleAuth, routes);

export default app;
