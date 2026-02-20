import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { initializeSocket } from './config/socket.js';

const httpServer = http.createServer();
const io = initializeSocket(httpServer);
const app = createApp(io);

httpServer.on('request', app);
httpServer.listen(env.port, () => {
  console.log(`Backend corriendo en puerto ${env.port}`);
});
