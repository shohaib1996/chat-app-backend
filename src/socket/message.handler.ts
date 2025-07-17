import { Server, Socket } from 'socket.io';
import {
  createMessage,
  getMessages,
  updateMessage,
} from '../modules/messages/message.services';

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
      io.to(payload.groupId).emit('newMessage', message);
    } catch (error: unknown) {
      // Handle error, e.g., log it or send an error message back to the client
    }
  });

  socket.on('getMessages', async (payload: any) => {
    try {
      const messages = await getMessages(
        payload.senderId,
        payload.receiverId,
        payload.groupId
      );
      socket.emit('messages', messages);
    } catch (error: unknown) {
      // Handle error
    }
  });

  socket.on('typing', (room: string) => {
    socket.to(room).emit('typing', socket.id);
  });

  socket.on('stopTyping', (room: string) => {
    socket.to(room).emit('stopTyping', socket.id);
  });

  socket.on('messageSeen', async (payload: any) => {
    try {
      const message = await updateMessage(payload.messageId, { seen: true });
      io.to(payload.groupId).emit('messageSeen', message);
    } catch (error: unknown) {
      // Handle error
    }
  });
};

export default registerMessageHandler;