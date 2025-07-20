import { Router } from 'express';
import * as groupController from './group.controller';
import validateRequest from '@/middleware/validateRequest';
import { createGroupSchema, updateGroupSchema } from './group.validation';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

router.post(
  '/',
  validateRequest(createGroupSchema),
  groupController.createGroup
);
router.get('/:id', groupController.getGroupById);
router.get('/', authMiddleware, groupController.getGroups);
router.put(
  '/:id',
  validateRequest(updateGroupSchema),
  groupController.updateGroup
);
router.delete('/:id', groupController.deleteGroup);

export default router;
