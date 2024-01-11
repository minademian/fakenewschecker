import { Router } from 'express';
import { Index, Ping } from '../controllers/index.controller';

export const AuthRoute = Router();

AuthRoute.get('/', Index);
