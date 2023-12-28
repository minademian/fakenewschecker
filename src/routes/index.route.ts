import { Router } from 'express';
import { Index, Ping } from '../controllers/index.controller';

export const IndexRoute = Router();

IndexRoute.get('/', Index);
IndexRoute.get('/ping', Ping);
