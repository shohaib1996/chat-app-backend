import { Server, Socket } from 'socket.io';
import { createMessage, getMessages, updateMessage } from '../modules/messages/message.services';

const registerMessageHandler = (io: Server, socket: Socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('leaveRoom', (room) => {
    socket.leave(room);
  });

  socket.on('sendMessage', async (payload) => {
    try {
      const message = await createMessage(payload);
      io.to(payload.groupId).emit('newMessage', message);
    } catch (error) {
      console.error('Error creating message:', error);
    }
  });

  socket.on('getMessages', async (payload) => {
    try {
      const messages = await getMessages(
        payload.senderId,
        payload.receiverId,
        payload.groupId
      );
      socket.emit('messages', messages);
    } catch (error) {
      console.error('Error getting messages:', error);
    }
  });

  socket.on('typing', (room) => {
    socket.to(room).emit('typing', socket.id);
  });

  socket.on('stopTyping', (room) => {
    socket.to(room).emit('stopTyping', socket.id);
  });

  socket.on('messageSeen', async (payload) => {
    try {
      const message = await updateMessage(payload.messageId, { seen: true });
      io.to(payload.groupId).emit('messageSeen', message);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  });
};

export default registerMessageHandler;
