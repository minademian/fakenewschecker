import { Request, Response } from 'express';

export const Index = (_req: Request, res: Response) => {
  res.status(200).json({ message: 'root route' });
};

export const Ping = (_req: Request, res: Response) => {
  res.status(200).json({ alive: true });
};
