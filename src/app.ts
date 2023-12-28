import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes';

const app = express();

const json = bodyParser.json();

app.use(json);

/* app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
); */

/* app.use('/', IndexRouter); */
app.use('/', routes);

export default app;
