import makeWASocket, { DisconnectReason, useMultiFileAuthState } from 'baileys';
import pino from 'pino';
import { prisma } from '../config/prisma.js';

const sessions = new Map();

export const listNumbers = () => prisma.whatsAppNumber.findMany({ orderBy: { createdAt: 'desc' } });

export const createNumber = async ({ name, phoneNumber }) => {
  const sessionPath = `sessions/${phoneNumber}`;
  return prisma.whatsAppNumber.create({
    data: { name, phoneNumber, sessionPath }
  });
};

export const connectNumber = async (numberId, io) => {
  const number = await prisma.whatsAppNumber.findUnique({ where: { id: numberId } });
  if (!number) throw new Error('Número no encontrado');

  const { state, saveCreds } = await useMultiFileAuthState(number.sessionPath);
  const socket = makeWASocket({ auth: state, printQRInTerminal: true, logger: pino({ level: 'silent' }) });
  sessions.set(number.id, socket);

  socket.ev.on('creds.update', saveCreds);
  socket.ev.on('connection.update', async ({ connection, qr, lastDisconnect }) => {
    if (qr) io.to('dashboard').emit('whatsapp:qr', { numberId: number.id, qr });

    const status = connection === 'open' ? 'CONNECTED' : connection === 'connecting' ? 'CONNECTING' : 'DISCONNECTED';
    await prisma.whatsAppNumber.update({
      where: { id: number.id },
      data: { status, lastConnection: connection === 'open' ? new Date() : undefined }
    });
    io.to('dashboard').emit('whatsapp:status', { numberId: number.id, status });

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) {
        connectNumber(number.id, io);
      }
    }
  });
};
