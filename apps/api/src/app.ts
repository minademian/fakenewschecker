import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { rateLimit } from 'express-rate-limit';
import hpp from 'hpp';

import { routes } from './routes';
import config from './services/config';
import { googleAuth } from './middlewares/google.middleware';

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: config.ApiStorePrefix,
});

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
  // TODO: refactor with a lib that's compatible with both limiter and express
});

config.checkEnvVariables();

app.use(
  bodyParser.json({
    limit: '8mb',
  })
);

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: config.ApiStorePrefix,
  })
);
app.use(hpp());
app.disable('x-powered-by');
app.use(helmet());
app.use(csrf());
app.use(
  cors({
    credentials: true,
    origin: [config.appUrl],
  })
);
app.use(limiter);

app.use(`/${config.apiPrefix}`, googleAuth, routes);

export default app;
