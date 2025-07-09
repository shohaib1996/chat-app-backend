import { z } from 'zod';

export const createMessageSchema = z.object({
  body: z.object({
    text: z.string().optional(),
    fileUrl: z.string().optional(),
    photoUrl: z.string().optional(),
    audioUrl: z.string().optional(),
    senderId: z.string(),
    receiverId: z.string().optional(),
    groupId: z.string().optional(),
  }),
});

export const updateMessageSchema = z.object({
  body: z.object({
    text: z.string().optional(),
    fileUrl: z.string().optional(),
    photoUrl: z.string().optional(),
    audioUrl: z.string().optional(),
    seen: z.boolean().optional(),
  }),
});
