import { Request, Response } from 'express';
import { getDomain } from 'tldts';

import config from '../services/config';

export const ExtractDomainName = (fullUrl: string) => getDomain(fullUrl);

export const Lookup = async (req: Request, res: Response) => {
  const { q } = req.query;

  res.status(200).json({});
};
