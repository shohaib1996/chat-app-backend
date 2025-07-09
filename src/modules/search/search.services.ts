import { PrismaClient } from '@prisma/client';
import { IUser } from '../users/user.interface';
import { IGroup } from '../groups/group.interface';

const prisma = new PrismaClient();

export const searchUsers = async (name: string): Promise<IUser[]> => {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      status: true,
    },
  });
  return users;
};

export const searchGroups = async (name: string): Promise<IGroup[]> => {
  const groups = await prisma.group.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  return groups;
};
