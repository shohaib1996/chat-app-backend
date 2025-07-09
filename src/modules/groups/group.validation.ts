import { z } from 'zod';

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    avatarUrl: z.string().optional(),
  }),
});

export const updateGroupSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    avatarUrl: z.string().optional(),
  }),
});
