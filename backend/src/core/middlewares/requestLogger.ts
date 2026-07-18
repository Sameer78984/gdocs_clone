import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { logger } from '../../lib/logger';

// Augment express request type to include id
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  req.id = crypto.randomUUID();

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      {
        requestId: req.id,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration,
        ip: req.ip,
      }
    );
  });

  next();
};
