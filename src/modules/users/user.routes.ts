import { Router } from 'express';
import * as userController from './user.controller';
import validateRequest from '@/middleware/validateRequest';
import { createUserSchema, updateUserSchema } from './user.validation';

const router = Router();

router.post('/register', validateRequest(createUserSchema), userController.registerUser);

router.get('/profile', userController.getProfile);
router.put('/profile', validateRequest(updateUserSchema), userController.updateProfile);

export default router;
