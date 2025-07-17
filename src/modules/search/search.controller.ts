import { Request, Response } from 'express';
import { searchUsers, searchGroups } from './search.services';
import sendResponse from '@/utils/sendResponse';

export const search = async (req: Request, res: Response): Promise<void> => {
  const { name, type } = req.query;

  if (!name || !type) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Missing name or type',
    });
  }

  try {
    if (type === 'user') {
      const users = await searchUsers(name as string);
      return sendResponse(res, { statusCode: 200, success: true, data: users });
    } else if (type === 'group') {
      const groups = await searchGroups(name as string);
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: groups,
      });
    } else {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'Invalid type',
      });
    }
  } catch {
    return sendResponse(res, { statusCode: 500, success: false, message: 'Internal server error' });
  }
};
