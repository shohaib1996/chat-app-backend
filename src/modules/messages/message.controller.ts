import { Request, Response } from 'express';
import * as messageService from './message.services';
import sendResponse from '@/utils/sendResponse';

export const createMessage = async (req: Request, res: Response) => {
  const message = await messageService.createMessage(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message created successfully',
    data: message,
  });
};

export const getMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const message = await messageService.getMessageById(id);
  if (!message) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Message not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message retrieved successfully',
    data: message,
  });
};

export const getMessages = async (req: Request, res: Response) => {
  const { senderId, receiverId, groupId } = req.query;
  const messages = await messageService.getMessages(
    senderId as string,
    receiverId as string,
    groupId as string
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages retrieved successfully',
    data: messages,
  });
};

export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedMessage = await messageService.updateMessage(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message updated successfully',
    data: updatedMessage,
  });
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedMessage = await messageService.deleteMessage(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message deleted successfully',
    data: deletedMessage,
  });
};
