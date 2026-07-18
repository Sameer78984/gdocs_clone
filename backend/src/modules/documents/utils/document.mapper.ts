import { Document, User } from '@prisma/client';

export interface DocumentOwnerDTO {
  id: string;
  name: string;
}

export interface DocumentDTO {
  id: string;
  title: string;
  content?: string;
  owner: DocumentOwnerDTO;
  permission?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const toDocumentDTO = (document: Document & { owner: User }, includeContent = false): DocumentDTO => {
  const dto: DocumentDTO = {
    id: document.id,
    title: document.title,
    owner: {
      id: document.owner.id,
      name: document.owner.name,
    },
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };

  if (includeContent && document.content !== undefined) {
    dto.content = document.content;
  }

  return dto;
};
