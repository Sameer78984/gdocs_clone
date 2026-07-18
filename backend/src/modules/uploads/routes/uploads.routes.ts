import { Router } from 'express';
import { uploadsController } from '../controllers/uploads.controller';
import { authenticate } from '../../../core/middlewares/authenticate';
import { upload } from '../../../core/middlewares/upload';

const router = Router();

router.use(authenticate);

// We expect a form-data field named 'file'
router.post('/', upload.single('file'), uploadsController.uploadDocument);

export default router;
