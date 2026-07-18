import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../core/responses/success';
import { setAuthCookie, clearAuthCookie } from '../../core/utils/cookie';

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await authService.register(req.body);
      setAuthCookie(res, token);

      return sendSuccess(res, 201, 'User registered successfully', { user });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await authService.login(req.body);
      setAuthCookie(res, token);

      return sendSuccess(res, 200, 'User logged in successfully', { user });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      clearAuthCookie(res);

      return sendSuccess(res, 200, 'User logged out successfully');
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req.user is populated by the authenticate middleware
      const user = (req as any).user;
      
      return sendSuccess(res, 200, 'Current user retrieved successfully', { user });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
