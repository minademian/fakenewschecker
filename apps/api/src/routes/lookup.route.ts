import { Router } from 'express';
import { Lookup } from '../controllers/lookup.controller';

export const LookupRoute = Router();

LookupRoute.get('/lookup', Lookup);
