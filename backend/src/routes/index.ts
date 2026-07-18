import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import documentRoutes from '../modules/documents/routes/document.routes';
import uploadsRoutes from '../modules/uploads/routes/uploads.routes';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Feature Routes
router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/documents/import', uploadsRoutes);

export default router;
