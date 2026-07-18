import { z } from 'zod';

export const shareDocumentSchema = z.object({
  body: z.object({
    email: z.string().email(),
    permission: z.enum(['READ', 'EDIT']),
  }),
});

export const updateShareSchema = z.object({
  body: z.object({
    permission: z.enum(['READ', 'EDIT']),
  }),
});
