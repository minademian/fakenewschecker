import { Request, Response } from 'express';

export const AllRows = (_req: Request, res: Response) => {
  res.status(200).json([]);
};

export const OneRow = (_req: Request, res: Response) => {};
