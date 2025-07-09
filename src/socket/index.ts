import { Server } from 'socket.io';
import registerMessageHandler from './message.handler';

const initializeSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    registerMessageHandler(io, socket);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default initializeSocket;
