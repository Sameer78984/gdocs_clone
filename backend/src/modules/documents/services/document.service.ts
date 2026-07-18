import { prisma } from '../../../lib/prisma';
import { documentPermissionService } from './document-permission.service';
import { NotFoundError } from '../../../core/errors';
import { 
  CreateDocumentInput, 
  UpdateDocumentContentInput, 
  RenameDocumentInput, 
  DocumentPaginationParams 
} from '../types/document.types';
import { toDocumentDTO, DocumentDTO } from '../utils/document.mapper';
import { DOCUMENT_CONSTANTS } from '../constants/document.constants';

export class DocumentService {
  private getPagination(params: DocumentPaginationParams) {
    const page = params.page && params.page > 0 ? params.page : DOCUMENT_CONSTANTS.PAGINATION.DEFAULT_PAGE;
    const limit = params.limit && params.limit > 0 && params.limit <= DOCUMENT_CONSTANTS.PAGINATION.MAX_LIMIT 
      ? params.limit 
      : DOCUMENT_CONSTANTS.PAGINATION.DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    
    return { skip, take: limit, page, limit };
  }

  async createDocument(userId: string, data: CreateDocumentInput): Promise<DocumentDTO> {
    const document = await prisma.document.create({
      data: {
        title: data.title,
        content: data.content || '',
        ownerId: userId,
      },
      include: { owner: true },
    });

    const dto = toDocumentDTO(document, true);
    dto.permission = 'OWNER';
    return dto;
  }

  async getDocumentById(userId: string, documentId: string): Promise<DocumentDTO> {
    await documentPermissionService.requireReadAccess(userId, documentId);

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { 
        owner: true,
        shares: {
          where: { userId }
        }
      },
    });

    if (!document) throw new NotFoundError('Document not found');

    const dto = toDocumentDTO(document, true);
    if (document.ownerId !== userId && document.shares && document.shares.length > 0) {
      dto.permission = document.shares[0].permission;
    } else if (document.ownerId === userId) {
      dto.permission = 'OWNER';
    }

    return dto;
  }

  async getOwnedDocuments(userId: string, params: DocumentPaginationParams) {
    const { skip, take, page, limit } = this.getPagination(params);
    const order = params.order || 'desc';
    const sort = params.sort || 'updatedAt';

    const where: any = { ownerId: userId };
    if (params.q) {
      where.title = { contains: params.q, mode: 'insensitive' };
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take,
        orderBy: { [sort]: order },
        include: { owner: true },
      }),
      prisma.document.count({ where }),
    ]);

    return {
      documents: documents.map(doc => {
        const dto = toDocumentDTO(doc);
        dto.permission = 'OWNER';
        return dto;
      }),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getSharedDocuments(userId: string, params: DocumentPaginationParams) {
    const { skip, take, page, limit } = this.getPagination(params);
    const order = params.order || 'desc';
    const sort = params.sort || 'updatedAt';

    const where: any = {
      shares: {
        some: { userId },
      },
    };
    
    if (params.q) {
      where.title = { contains: params.q, mode: 'insensitive' };
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take,
        orderBy: { [sort]: order },
        include: { 
          owner: true,
          shares: {
            where: { userId }
          }
        },
      }),
      prisma.document.count({ where }),
    ]);

    return {
      documents: documents.map(doc => {
        const dto = toDocumentDTO(doc);
        if (doc.shares && doc.shares.length > 0) {
          dto.permission = doc.shares[0].permission;
        }
        return dto;
      }),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAllDocuments(userId: string, params: DocumentPaginationParams) {
    const { skip, take, page, limit } = this.getPagination(params);
    const order = params.order || 'desc';
    const sort = params.sort || 'updatedAt';

    const where: any = {
      OR: [
        { ownerId: userId },
        { shares: { some: { userId } } },
      ],
    };
    
    if (params.q) {
      where.title = { contains: params.q, mode: 'insensitive' };
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take,
        orderBy: { [sort]: order },
        include: { 
          owner: true,
          shares: {
            where: { userId }
          }
        },
      }),
      prisma.document.count({ where }),
    ]);

    return {
      documents: documents.map(doc => {
        const dto = toDocumentDTO(doc);
        if (doc.ownerId === userId) {
          dto.permission = 'OWNER';
        } else if (doc.shares && doc.shares.length > 0) {
          dto.permission = doc.shares[0].permission;
        }
        return dto;
      }),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateContent(userId: string, documentId: string, data: UpdateDocumentContentInput): Promise<DocumentDTO> {
    await documentPermissionService.requireEditAccess(userId, documentId);

    const document = await prisma.document.update({
      where: { id: documentId },
      data: { content: data.content },
      include: { owner: true },
    });

    const dto = toDocumentDTO(document, true);
    dto.permission = document.ownerId === userId ? 'OWNER' : 'EDIT';
    return dto;
  }

  async renameDocument(userId: string, documentId: string, data: RenameDocumentInput): Promise<DocumentDTO> {
    await documentPermissionService.requireEditAccess(userId, documentId);

    const document = await prisma.document.update({
      where: { id: documentId },
      data: { title: data.title },
      include: { owner: true },
    });

    const dto = toDocumentDTO(document);
    dto.permission = document.ownerId === userId ? 'OWNER' : 'EDIT';
    return dto;
  }

  async deleteDocument(userId: string, documentId: string): Promise<void> {
    await documentPermissionService.requireOwner(userId, documentId);

    await prisma.document.delete({
      where: { id: documentId },
    });
  }
}

export const documentService = new DocumentService();
