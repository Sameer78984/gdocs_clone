import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { sendError } from '../responses/error';
import { logger } from '../../lib/logger';
import { env } from '../../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${err.name}: ${err.message}`, {
    requestId: req.id,
    stack: err.stack,
  });

  if (err instanceof AppError) {
    return sendError(
      res,
      err.statusCode,
      err.message,
      (err as any).errors || undefined
    );
  }

  // Handle generic errors (e.g. Prisma errors, unhandled errors)
  const isProduction = env.NODE_ENV === 'production';
  return sendError(
    res,
    500,
    isProduction ? 'Internal server error' : err.message
  );
};
