import { getGroupMembersByGroupId } from '../modules/groupmembers/groupmember.services';
import { Server, Socket } from 'socket.io';
import {
  createMessage,
  getMessages,
  updateMessage,
} from '../modules/messages/message.services';
import { verifyToken } from '@/utils/generateToken';

const registerMessageHandler = (io: Server, socket: Socket): void => {
  socket.on('joinRoom', (room: string) => {
    socket.join(room);
  });

  socket.on('leaveRoom', (room: string) => {
    socket.leave(room);
  });

  socket.on('sendMessage', async (payload: any) => {
    try {
      const message = await createMessage(payload);
      const members = await getGroupMembersByGroupId(payload.groupId);
      members.forEach(member => {
        if (member.userId !== payload.senderId) {
          io.to(member.userId).emit('newMessage', message);
        }
      });
    } catch (error: unknown) {
      console.log(error);
      // Handle error, e.g., log it or send an error message back to the client
    }
  });

  socket.on('getMessages', async (payload: any) => {
    try {
      const messages = await getMessages(payload);
      socket.emit('messages', messages);
    } catch (error: unknown) {
      // Handle error
      console.log(error);
    }
  });

  socket.on('typing', (room: string) => {
    const token = socket.handshake.auth.token as string;
    const decodedToken = verifyToken(token);
    let userId: string | undefined;
    if (
      decodedToken &&
      typeof decodedToken !== 'string' &&
      'user' in decodedToken
    ) {
      userId = (decodedToken.user as { id: string }).id;
      console.log('Extracted userId:', userId);
    }
    console.log('Backend: Emitting typing event', {
      socketId: socket.id,
      userId,
      room,
    });
    socket.to(room).emit('typing', { socketId: socket.id, userId });
  });

  socket.on('stopTyping', (room: string) => {
    const token = socket.handshake.auth.token as string;
    const decodedToken = verifyToken(token);
    let userId: string | undefined;

    if (
      decodedToken &&
      typeof decodedToken !== 'string' &&
      'user' in decodedToken
    ) {
      userId = (decodedToken.user as { id: string }).id;
      console.log('Extracted userId:', userId);
    }
    socket.to(room).emit('stopTyping', { socketId: socket.id, userId });
  });

  socket.on('messageSeen', async (payload: any) => {
    try {
      const message = await updateMessage(payload.messageId, { seen: true });
      io.to(payload.groupId).emit('messageSeen', message);
    } catch (error: unknown) {
      // Handle error
      console.log(error);
    }
  });
};

export default registerMessageHandler;
