import { Router } from 'express';
import { OneRow, AllRows } from '../controllers/google.controller';

export const GoogleRoute = Router();

GoogleRoute.get('/data', AllRows);
GoogleRoute.get('/data/:id', OneRow);
