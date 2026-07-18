import { Request, Response, NextFunction } from 'express';
import { uploadsService } from '../services/uploads.service';
import { sendSuccess } from '../../../core/responses/success';

export class UploadsController {
  uploadDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const document = await uploadsService.processUpload(userId, req.file);
      return sendSuccess(res, 201, 'Document uploaded and created successfully', document);
    } catch (error) {
      next(error);
    }
  };
}

export const uploadsController = new UploadsController();
