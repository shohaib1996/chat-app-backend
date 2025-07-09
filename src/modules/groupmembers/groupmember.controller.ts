import { Request, Response } from 'express';
import * as groupMemberService from './groupmember.services';
import sendResponse from '@/utils/sendResponse';

export const createGroupMember = async (req: Request, res: Response) => {
  const groupMember = await groupMemberService.createGroupMember(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Group member created successfully',
    data: groupMember,
  });
};

export const getGroupMemberById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const groupMember = await groupMemberService.getGroupMemberById(id);
  if (!groupMember) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Group member not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group member retrieved successfully',
    data: groupMember,
  });
};

export const getGroupMembers = async (req: Request, res: Response) => {
  const { groupId, userId } = req.query;
  const groupMembers = await groupMemberService.getGroupMembers(groupId as string, userId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group members retrieved successfully',
    data: groupMembers,
  });
};

export const updateGroupMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Received ID for update:', id); 
  console.log('Received body for update:', req.body);
  const updatedGroupMember = await groupMemberService.updateGroupMember(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group member updated successfully',
    data: updatedGroupMember,
  });
};

export const deleteGroupMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedGroupMember = await groupMemberService.deleteGroupMember(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Group member deleted successfully',
    data: deletedGroupMember,
  });
};
