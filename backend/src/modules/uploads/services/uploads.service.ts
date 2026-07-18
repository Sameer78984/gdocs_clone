import { documentService } from '../../documents/services/document.service';
import { ValidationError } from '../../../core/errors';
import { DocumentDTO } from '../../documents/utils/document.mapper';

export class UploadsService {
  async processUpload(userId: string, file?: Express.Multer.File): Promise<DocumentDTO> {
    if (!file) {
      throw new ValidationError('No file provided');
    }

    // Convert memory buffer to string (utf-8)
    const content = file.buffer.toString('utf-8');

    // Extract title from original filename without extension
    const title = file.originalname.replace(/\.(txt|md)$/i, '') || 'Untitled Document';

    // Delegate to DocumentService for creation
    return documentService.createDocument(userId, {
      title,
      content,
    });
  }
}

export const uploadsService = new UploadsService();
