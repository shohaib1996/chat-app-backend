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

export const getMessages = async ({
  senderId,
  receiverId,
  groupId,
}: {
  senderId?: string;
  receiverId?: string;
  groupId?: string;
}): Promise<IMessage[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let where: any = {};

  if (groupId) {
    where = { groupId };
  } else if (senderId && receiverId) {
    where = {
      OR: [
        {
          AND: [{ senderId }, { receiverId }],
        },
        {
          AND: [{ senderId: receiverId }, { receiverId: senderId }],
        },
      ],
    };
  }

  const messages = await prisma.message.findMany({
    where,
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
