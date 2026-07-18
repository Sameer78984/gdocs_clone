import { z } from 'zod';
import { DOCUMENT_CONSTANTS } from '../constants/document.constants';

export const createDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(DOCUMENT_CONSTANTS.TITLE.MIN_LENGTH).max(DOCUMENT_CONSTANTS.TITLE.MAX_LENGTH),
    content: z.string().optional(),
  }),
});

export const updateDocumentSchema = z.object({
  body: z.object({
    content: z.string(),
  }),
});

export const renameDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(DOCUMENT_CONSTANTS.TITLE.MIN_LENGTH).max(DOCUMENT_CONSTANTS.TITLE.MAX_LENGTH),
  }),
});

export const documentPaginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(DOCUMENT_CONSTANTS.PAGINATION.MAX_LIMIT).optional(),
    sort: z.enum(['createdAt', 'updatedAt', 'title']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    q: z.string().optional(),
  }),
});
