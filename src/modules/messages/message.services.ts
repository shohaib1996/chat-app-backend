import { PrismaClient } from '@prisma/client';
import {
  ICreateMessagePayload,
  IUpdateMessagePayload,
  IMessage,
} from './message.interface';

const prisma = new PrismaClient();

export const createMessage = async (
  payload: ICreateMessagePayload
): Promise<IMessage> => {
  const message = await prisma.message.create({
    data: payload,
    include: {
      sender: true,
      receiver: true,
    },
  });
  return message;
};

export const getMessageById = async (id: string): Promise<IMessage | null> => {
  const message = await prisma.message.findUnique({
    where: { id },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return message;
};

export const getMessages = async (
  senderId?: string,
  receiverId?: string,
  groupId?: string
): Promise<IMessage[]> => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [{ senderId: senderId }, { receiverId: receiverId }],
        },
        {
          AND: [{ senderId: receiverId }, { receiverId: senderId }],
        },
      ],
      groupId: groupId,
    },
    include: {
      sender: true,
      receiver: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return messages;
};

export const updateMessage = async (
  id: string,
  payload: IUpdateMessagePayload
): Promise<IMessage> => {
  const message = await prisma.message.update({
    where: { id },
    data: payload,
    include: {
      sender: true,
      receiver: true,
    },
  });
  return message;
};

export const deleteMessage = async (id: string): Promise<IMessage> => {
  const message = await prisma.message.delete({
    where: { id },
    include: {
      sender: true,
      receiver: true,
    },
  });
  return message;
};
