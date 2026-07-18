import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../core/middlewares/validate';
import { authenticate } from '../../core/middlewares/authenticate';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
