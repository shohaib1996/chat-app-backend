// src/socket/index.ts
import { Server, Socket } from 'socket.io';
import registerMessageHandler from './message.handler';
import { verifyToken } from '@/utils/generateToken';

interface User {
  userId: string;
  socketId: string;
}

const connectedUsers: Map<string, User> = new Map();

const initializeSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Extract userId from auth token (assuming your auth middleware includes userId)
    const token = socket.handshake.auth.token as string;
    console.log('Raw token:', token);
    const decodedToken = verifyToken(token);
    console.log('Decoded token:', decodedToken);
    let userId: string | undefined;

    if (
      decodedToken &&
      typeof decodedToken !== 'string' &&
      'user' in decodedToken
    ) {
      userId = (decodedToken.user as { id: string }).id;
      console.log('Extracted userId:', userId);
    }
    if (userId) {
      connectedUsers.set(socket.id, { userId, socketId: socket.id });
      io.emit('onlineUsers', Array.from(connectedUsers.values()));
    }

    registerMessageHandler(io, socket);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      connectedUsers.delete(socket.id);
      io.emit('onlineUsers', Array.from(connectedUsers.values()));
    });
  });
};

export default initializeSocket;
