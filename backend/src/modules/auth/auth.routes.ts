import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { env } from '../../config/env';
import { authController } from './auth.controller';
import { validate } from '../../core/middlewares/validate';
import { authenticate } from '../../core/middlewares/authenticate';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();

// Standard auth rate limit: 5 requests per 15 minutes in prod, extremely relaxed in dev
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: env.NODE_ENV === 'production' ? 5 : 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts, please try again later.' }
});

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
