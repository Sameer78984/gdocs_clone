import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../errors';
import { AuthenticatedRequest } from '../types';
import { verifyToken } from '../../lib/jwt';
import { AUTH_CONSTANTS } from '../../modules/auth/constants/auth.constants';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // Check cookies first
  if (req.cookies && req.cookies[AUTH_CONSTANTS.COOKIE_NAME]) {
    token = req.cookies[AUTH_CONSTANTS.COOKIE_NAME];
  }
  // Fallback to Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AuthenticationError('Not authenticated'));
  }

  try {
    const decoded = verifyToken(token);
    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    next(new AuthenticationError('Invalid or expired token'));
  }
};
