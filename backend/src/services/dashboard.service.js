import { prisma } from '../config/prisma.js';

export const getDashboard = async () => {
  const [conversations, todaysMessages, byAgent, byNumber] = await Promise.all([
    prisma.chat.count({ where: { isActive: true } }),
    prisma.message.count({
      where: {
        sentAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }
    }),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { assignedChats: true, activityLogs: true } }
      }
    }),
    prisma.whatsAppNumber.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        _count: { select: { chats: true } }
      }
    })
  ]);

  return { conversations, todaysMessages, byAgent, byNumber };
};
