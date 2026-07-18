import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.method} ${req.originalUrl}`));
};
