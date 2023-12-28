import { Router } from 'express';
import { IndexRoute } from './routes/index.route';

export const routes = Router();

routes.use(IndexRoute);
