import { Router } from 'express';
import { documentController } from '../controllers/document.controller';
import { authenticate } from '../../../core/middlewares/authenticate';
import { validate } from '../../../core/middlewares/validate';
import {
  createDocumentSchema,
  updateDocumentSchema,
  renameDocumentSchema,
  documentPaginationSchema,
} from '../schemas/document.schema';
import { sharingController } from '../../sharing/controllers/sharing.controller';
import { shareDocumentSchema, updateShareSchema } from '../../sharing/schemas/sharing.schema';

const router = Router();

// All document routes require authentication
router.use(authenticate);

router.post('/', validate(createDocumentSchema), documentController.createDocument);

router.get('/', validate(documentPaginationSchema), documentController.getAllDocuments);

router.get('/owned', validate(documentPaginationSchema), documentController.getOwnedDocuments);

router.get('/shared', validate(documentPaginationSchema), documentController.getSharedDocuments);

// Note: /:id must come after /owned and /shared to avoid taking precedence
router.get('/:id', documentController.getDocumentById);

router.patch('/:id', validate(updateDocumentSchema), documentController.updateContent);

router.patch('/:id/title', validate(renameDocumentSchema), documentController.renameDocument);

router.delete('/:id', documentController.deleteDocument);

// Sharing endpoints (Document-centric)
router.post('/:id/shares', validate(shareDocumentSchema), sharingController.shareDocument);
router.get('/:id/shares', sharingController.getDocumentShares);
router.patch('/:id/shares/:shareId', validate(updateShareSchema), sharingController.updatePermission);
router.delete('/:id/shares/:shareId', sharingController.removeShare);

export default router;
