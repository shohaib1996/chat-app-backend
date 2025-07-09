import { Request, Response } from 'express';
import * as userService from './user.services';
import sendResponse from '@/utils/sendResponse';

export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existing = await userService.getUserByEmail(email);
  if (existing) {
    return sendResponse(res, {
      statusCode: 409,
      success: false,
      message: 'Email already exists',
    });
  }

  const user = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
};

export const getProfile = async (req: Request, res: Response) => {
  // const userId = req.user?.id;
  const userId = '686dfe91ce75eb7357ad2db5';
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await userService.updateUser(userId, {});
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieve successfully!',
    data: user,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  // const userId = req.user?.id;
  const userId = '686dfe91ce75eb7357ad2db5';
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const updatedUser = await userService.updateUser(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
};
