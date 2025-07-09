import { Request, Response } from 'express';
import * as groupService from './group.services';
import sendResponse from '@/utils/sendResponse';

export const createGroup = async (req: Request, res: Response) => {
  const group = await groupService.createGroup(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Group created successfully',
    data: group,
  });
};

export const getGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await groupService.getGroupById(id);
  if (!group) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Group not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group retrieved successfully',
    data: group,
  });
};

export const getGroups = async (req: Request, res: Response) => {
  const groups = await groupService.getGroups();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Groups retrieved successfully',
    data: groups,
  });
};

export const updateGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGroup = await groupService.updateGroup(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group updated successfully',
    data: updatedGroup,
  });
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedGroup = await groupService.deleteGroup(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group deleted successfully',
    data: deletedGroup,
  });
};
