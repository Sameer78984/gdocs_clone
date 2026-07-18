import { prisma } from '../../../lib/prisma';
import { documentPermissionService } from '../../documents/services/document-permission.service';
import { NotFoundError, ConflictError } from '../../../core/errors';

export class SharingService {
  async shareDocument(ownerId: string, documentId: string, targetEmail: string, permission: 'READ' | 'EDIT') {
    await documentPermissionService.requireShareAccess(ownerId, documentId);

    const targetUser = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!targetUser) {
      throw new NotFoundError('User with this email not found');
    }

    if (targetUser.id === ownerId) {
      throw new ConflictError('You cannot share a document with yourself');
    }

    const existingShare = await prisma.documentShare.findUnique({
      where: {
        documentId_userId: {
          documentId,
          userId: targetUser.id,
        },
      },
    });

    if (existingShare) {
      throw new ConflictError('Document is already shared with this user');
    }

    const share = await prisma.documentShare.create({
      data: {
        documentId,
        userId: targetUser.id,
        permission,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      id: share.id,
      permission: share.permission,
      user: share.user,
      createdAt: share.createdAt,
    };
  }

  async getDocumentShares(ownerId: string, documentId: string) {
    await documentPermissionService.requireShareAccess(ownerId, documentId);

    const shares = await prisma.documentShare.findMany({
      where: { documentId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return shares.map(share => ({
      id: share.id,
      permission: share.permission,
      user: share.user,
      createdAt: share.createdAt,
    }));
  }

  async updatePermission(ownerId: string, documentId: string, shareId: string, permission: 'READ' | 'EDIT') {
    await documentPermissionService.requireShareAccess(ownerId, documentId);

    const share = await prisma.documentShare.findUnique({
      where: { id: shareId },
    });

    if (!share || share.documentId !== documentId) {
      throw new NotFoundError('Share record not found');
    }

    const updatedShare = await prisma.documentShare.update({
      where: { id: shareId },
      data: { permission },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      id: updatedShare.id,
      permission: updatedShare.permission,
      user: updatedShare.user,
      createdAt: updatedShare.createdAt,
    };
  }

  async removeShare(ownerId: string, documentId: string, shareId: string) {
    await documentPermissionService.requireShareAccess(ownerId, documentId);

    const share = await prisma.documentShare.findUnique({
      where: { id: shareId },
    });

    if (!share || share.documentId !== documentId) {
      throw new NotFoundError('Share record not found');
    }

    await prisma.documentShare.delete({
      where: { id: shareId },
    });
  }
}

export const sharingService = new SharingService();
