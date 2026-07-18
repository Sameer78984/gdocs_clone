import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { env } from '../../../config/env';
import { uploadsController } from '../controllers/uploads.controller';
import { authenticate } from '../../../core/middlewares/authenticate';
import { upload } from '../../../core/middlewares/upload';

const router = Router();

// Upload rate limit: 30 requests per 15 minutes in prod, extremely relaxed in dev
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: env.NODE_ENV === 'production' ? 30 : 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many file uploads, please try again later.' }
});

router.use(authenticate);

// We expect a form-data field named 'file'
router.post('/', uploadLimiter, upload.single('file'), uploadsController.uploadDocument);

export default router;
