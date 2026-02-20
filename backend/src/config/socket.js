import { Server } from 'socket.io';
import { env } from './env.js';

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('join:dashboard', () => socket.join('dashboard'));
    socket.on('join:number', (numberId) => socket.join(`number:${numberId}`));
  });

  return io;
};
