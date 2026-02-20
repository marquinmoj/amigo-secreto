import { prisma } from '../config/prisma.js';

export const autoAssignChat = async (chatId) => {
  const agents = await prisma.user.findMany({ where: { role: 'AGENT' }, include: { assignedChats: true } });
  if (!agents.length) return null;

  const sorted = agents.sort((a, b) => a.assignedChats.length - b.assignedChats.length);
  const agent = sorted[0];
  return prisma.chat.update({ where: { id: chatId }, data: { assignedAgentId: agent.id } });
};

export const manualAssignChat = async (chatId, agentId, actorId) => {
  const chat = await prisma.chat.update({ where: { id: chatId }, data: { assignedAgentId: agentId } });
  await prisma.activityLog.create({
    data: {
      action: 'manual_assign_chat',
      userId: actorId,
      metadata: { chatId, agentId }
    }
  });
  return chat;
};
