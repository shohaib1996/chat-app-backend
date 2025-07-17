import { Server } from 'socket.io';
import registerMessageHandler from './message.handler';

const initializeSocket = (io: Server) => {
  io.on('connection', socket => {
    

    registerMessageHandler(io, socket);

    socket.on('disconnect', () => {
      
    });
  });
};

export default initializeSocket;
