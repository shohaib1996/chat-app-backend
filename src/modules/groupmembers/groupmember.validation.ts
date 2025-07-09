import { z } from 'zod';

export const createGroupMemberSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    groupId: z.string({
      required_error: 'Group ID is required',
    }),
    isAdmin: z.boolean().optional(),
  }),
});

export const updateGroupMemberSchema = z.object({
  body: z.object({
    isAdmin: z.boolean().optional(),
  }),
});
