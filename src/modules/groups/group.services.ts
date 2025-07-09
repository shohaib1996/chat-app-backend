import { PrismaClient } from '@prisma/client';
import {
  ICreateGroupPayload,
  IUpdateGroupPayload,
  IGroup,
} from './group.interface';

const prisma = new PrismaClient();

export const createGroup = async (
  payload: ICreateGroupPayload
): Promise<IGroup> => {
  const group = await prisma.group.create({
    data: payload,
  });
  return group;
};

export const getGroupById = async (id: string): Promise<IGroup | null> => {
  const group = await prisma.group.findUnique({
    where: { id },
  });
  return group;
};

export const getGroups = async (): Promise<IGroup[]> => {
  const groups = await prisma.group.findMany();
  return groups;
};

export const updateGroup = async (
  id: string,
  payload: IUpdateGroupPayload
): Promise<IGroup> => {
  const group = await prisma.group.update({
    where: { id },
    data: payload,
  });
  return group;
};

export const deleteGroup = async (id: string): Promise<IGroup> => {
  const group = await prisma.group.delete({
    where: { id },
  });
  return group;
};
