import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
import prisma from '@/config/database';

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  status?: string;
}): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatarUrl:
        data.avatarUrl ??
        'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
      status: data.status ?? 'online',
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    status: user.status ?? undefined,
  };
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (
  userId: string,
  data: {
    name?: string;
    avatarUrl?: string;
    status?: string;
  }
): Promise<IUser> => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    status: user.status ?? undefined,
  };
};
