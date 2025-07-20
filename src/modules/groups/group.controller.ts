import { NextFunction, Request, Response } from 'express';
import * as groupServices from './group.services';
import sendResponse from '@/utils/sendResponse';

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: 'Unauthorized',
      });
    }
    const group = await groupServices.createGroup(req.body, req.user.id);
    sendResponse(res, { statusCode: 201, success: true, data: group });
  } catch (error) {
    next(error);
  }
};

export const getGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const group = await groupServices.getGroupById(id);
  if (!group) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Group not found',
    });
  }
  sendResponse(res, { statusCode: 200, success: true, data: group });
};

export const getGroups = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Unauthorized',
    });
  }
  const groups = await groupServices.getGroups(req.user.id);
  sendResponse(res, { statusCode: 200, success: true, data: groups });
};

export const updateGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updatedGroup = await groupServices.updateGroup(id, req.body);
  sendResponse(res, { statusCode: 200, success: true, data: updatedGroup });
};

export const deleteGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const deletedGroup = await groupServices.deleteGroup(id);
  sendResponse(res, { statusCode: 200, success: true, data: deletedGroup });
};
