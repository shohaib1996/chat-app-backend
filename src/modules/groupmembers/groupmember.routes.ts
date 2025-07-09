import { Router } from 'express';
import * as groupMemberController from './groupmember.controller';
import validateRequest from '@/middleware/validateRequest';
import {
  createGroupMemberSchema,
  updateGroupMemberSchema,
} from './groupmember.validation';

const router = Router();

router.post(
  '/',
  validateRequest(createGroupMemberSchema),
  groupMemberController.createGroupMember
);
router.get('/:id', groupMemberController.getGroupMemberById);
router.get('/', groupMemberController.getGroupMembers);
router.put(
  '/:id',
  validateRequest(updateGroupMemberSchema),
  groupMemberController.updateGroupMember
);
router.delete('/:id', groupMemberController.deleteGroupMember);

export default router;
