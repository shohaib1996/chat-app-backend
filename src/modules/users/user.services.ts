import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
import prisma from '@/config/database';
import { generateToken } from '@/utils/generateToken';

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

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return prisma.user.findUnique({
    where: { id },
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

export const getUsers = async (): Promise<IUser[]> => {
  const users = await prisma.user.findMany();

  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    status: user.status ?? undefined,
  }));
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser | null; token: string | null }> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { user: null, token: null };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { user: null, token: null };
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl ?? undefined,
      status: user.status ?? undefined,
    },
    token,
  };
};
