import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import whatsappRoutes from './routes/whatsapp.routes.js';
import chatRoutes from './routes/chat.routes.js';
import contactRoutes from './routes/contact.routes.js';
import pipelineRoutes from './routes/pipeline.routes.js';
import botRoutes from './routes/bot.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const createApp = (io) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api/whatsapp', whatsappRoutes(io));
  app.use('/api/chats', chatRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/pipeline', pipelineRoutes);
  app.use('/api/bot', botRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use(errorMiddleware);

  return app;
};
