import { PrismaClient } from '@prisma/client';
import {
  ICreateGroupMemberPayload,
  IUpdateGroupMemberPayload,
  IGroupMember,
} from './groupmember.interface';

const prisma = new PrismaClient();

export const createGroupMember = async (
  payload: ICreateGroupMemberPayload
): Promise<IGroupMember> => {
  const groupMember = await prisma.groupMember.create({
    data: payload,
  });
  return groupMember;
};

export const getGroupMemberById = async (
  id: string
): Promise<IGroupMember | null> => {
  const groupMember = await prisma.groupMember.findUnique({
    where: { id },
  });
  return groupMember;
};

export const getGroupMembers = async (
  groupId?: string,
  userId?: string
): Promise<IGroupMember[]> => {
  const where: { groupId?: string; userId?: string } = {};
  if (groupId) {
    where.groupId = groupId;
  }
  if (userId) {
    where.userId = userId;
  }
  const groupMembers = await prisma.groupMember.findMany({
    where,
  });
  return groupMembers;
};

export const updateGroupMember = async (
  id: string,
  payload: IUpdateGroupMemberPayload
): Promise<IGroupMember> => {
  const groupMember = await prisma.groupMember.update({
    where: { id },
    data: payload,
  });
  return groupMember;
};

export const deleteGroupMember = async (id: string): Promise<IGroupMember> => {
  const groupMember = await prisma.groupMember.delete({
    where: { id },
  });
  return groupMember;
};
