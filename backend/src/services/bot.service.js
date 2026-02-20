import { prisma } from '../config/prisma.js';

export const getBotConfig = () => prisma.botConfig.findFirst();

export const upsertBotConfig = async (payload) => {
  const current = await prisma.botConfig.findFirst();
  if (!current) {
    return prisma.botConfig.create({ data: payload });
  }
  return prisma.botConfig.update({ where: { id: current.id }, data: payload });
};
