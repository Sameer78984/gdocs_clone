import { prisma } from '../../../lib/prisma';
import { AuthorizationError, NotFoundError } from '../../../core/errors';

export class DocumentPermissionService {
  async requireOwner(userId: string, documentId: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { ownerId: true },
    });

    if (!document) {
      throw new NotFoundError('Document not found');
    }

    if (document.ownerId !== userId) {
      throw new AuthorizationError('You do not have permission to perform this action');
    }
  }

  async requireReadAccess(userId: string, documentId: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { ownerId: true },
    });

    if (!document) {
      throw new NotFoundError('Document not found');
    }

    if (document.ownerId === userId) {
      return;
    }

    const share = await prisma.documentShare.findUnique({
      where: {
        documentId_userId: { documentId, userId },
      },
      select: { permission: true },
    });

    if (!share) {
      throw new AuthorizationError('You do not have read access to this document');
    }
  }

  async requireEditAccess(userId: string, documentId: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: { ownerId: true },
    });

    if (!document) {
      throw new NotFoundError('Document not found');
    }

    if (document.ownerId === userId) {
      return;
    }

    const share = await prisma.documentShare.findUnique({
      where: {
        documentId_userId: { documentId, userId },
      },
      select: { permission: true },
    });

    if (!share || share.permission !== 'EDIT') {
      throw new AuthorizationError('You do not have edit access to this document');
    }
  }

  async requireShareAccess(userId: string, documentId: string) {
    // Only owners can share documents in this MVP
    await this.requireOwner(userId, documentId);
  }
}

export const documentPermissionService = new DocumentPermissionService();
