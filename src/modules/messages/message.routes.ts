import { Router } from 'express';
import * as messageController from './message.controller';
import validateRequest from '@/middleware/validateRequest';
import { createMessageSchema, updateMessageSchema } from './message.validation';

const router = Router();

router.post('/', validateRequest(createMessageSchema), messageController.createMessage);
router.get('/:id', messageController.getMessageById);
router.get('/', messageController.getMessages);
router.put('/:id', validateRequest(updateMessageSchema), messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

export default router;
