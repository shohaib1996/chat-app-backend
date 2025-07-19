import { Router } from 'express';
import * as userController from './user.controller';
import validateRequest from '@/middleware/validateRequest';
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} from './user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(createUserSchema),
  userController.registerUser
);

router.get('/profile', userController.getProfile);
router.put(
  '/profile',
  validateRequest(updateUserSchema),
  userController.updateProfile
);

router.get('/users', userController.getAllUsers);

router.post(
  '/login',
  validateRequest(loginUserSchema),
  userController.loginUser
);

export default router;
