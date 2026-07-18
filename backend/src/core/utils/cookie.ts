import { Response } from 'express';
import { env } from '../../config/env';
import { AUTH_CONSTANTS } from '../../modules/auth/constants/auth.constants';

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie(AUTH_CONSTANTS.COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: AUTH_CONSTANTS.COOKIE_MAX_AGE_MS,
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(AUTH_CONSTANTS.COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
};
