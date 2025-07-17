import { IUser } from '../users/user.interface';

export interface IMessage {
  id: string;
  text: string | null;
  fileUrl: string | null;
  photoUrl: string | null;
  audioUrl: string | null;
  senderId: string;
  receiverId: string | null;
  groupId: string | null;
  seen: boolean;
  createdAt: Date;
  sender: IUser;
  receiver: IUser | null;
}

export interface ICreateMessagePayload {
  text?: string;
  fileUrl?: string;
  photoUrl?: string;
  audioUrl?: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
}

export interface IUpdateMessagePayload {
  text?: string;
  fileUrl?: string;
  photoUrl?: string;
  audioUrl?: string;
  seen?: boolean;
}
