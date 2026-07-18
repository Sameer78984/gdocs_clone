import { Request, Response, NextFunction } from 'express';
import { sharingService } from '../services/sharing.service';
import { sendSuccess } from '../../../core/responses/success';

export class SharingController {
  shareDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = (req as any).user.id;
      const documentId = req.params.id as string;
      const { email, permission } = req.body;
      
      const share = await sharingService.shareDocument(ownerId, documentId, email, permission);
      return sendSuccess(res, 201, 'Document shared successfully', share);
    } catch (error) {
      next(error);
    }
  };

  getDocumentShares = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = (req as any).user.id;
      const documentId = req.params.id as string;

      const shares = await sharingService.getDocumentShares(ownerId, documentId);
      return sendSuccess(res, 200, 'Shares retrieved successfully', shares);
    } catch (error) {
      next(error);
    }
  };

  updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = (req as any).user.id;
      const documentId = req.params.id as string;
      const shareId = req.params.shareId as string;
      const { permission } = req.body;

      const share = await sharingService.updatePermission(ownerId, documentId, shareId, permission);
      return sendSuccess(res, 200, 'Share permission updated successfully', share);
    } catch (error) {
      next(error);
    }
  };

  removeShare = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = (req as any).user.id;
      const documentId = req.params.id as string;
      const shareId = req.params.shareId as string;

      await sharingService.removeShare(ownerId, documentId, shareId);
      return sendSuccess(res, 200, 'Share removed successfully');
    } catch (error) {
      next(error);
    }
  };
}

export const sharingController = new SharingController();
