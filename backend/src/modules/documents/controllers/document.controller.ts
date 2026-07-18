import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document.service';
import { sendSuccess } from '../../../core/responses/success';

export class DocumentController {
  createDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const document = await documentService.createDocument(userId, req.body);
      return sendSuccess(res, 201, 'Document created successfully', document);
    } catch (error) {
      next(error);
    }
  };

  getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const document = await documentService.getDocumentById(userId, req.params.id as string);
      return sendSuccess(res, 200, 'Document retrieved successfully', document);
    } catch (error) {
      next(error);
    }
  };

  getOwnedDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const result = await documentService.getOwnedDocuments(userId, req.query);
      return sendSuccess(res, 200, 'Documents retrieved successfully', result.documents, result.meta);
    } catch (error) {
      next(error);
    }
  };

  getSharedDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const result = await documentService.getSharedDocuments(userId, req.query);
      return sendSuccess(res, 200, 'Documents retrieved successfully', result.documents, result.meta);
    } catch (error) {
      next(error);
    }
  };

  getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const result = await documentService.getAllDocuments(userId, req.query);
      return sendSuccess(res, 200, 'Documents retrieved successfully', result.documents, result.meta);
    } catch (error) {
      next(error);
    }
  };

  updateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const document = await documentService.updateContent(userId, req.params.id as string, req.body);
      return sendSuccess(res, 200, 'Document updated successfully', document);
    } catch (error) {
      next(error);
    }
  };

  renameDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const document = await documentService.renameDocument(userId, req.params.id as string, req.body);
      return sendSuccess(res, 200, 'Document renamed successfully', document);
    } catch (error) {
      next(error);
    }
  };

  deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      await documentService.deleteDocument(userId, req.params.id as string);
      return sendSuccess(res, 200, 'Document deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

export const documentController = new DocumentController();
