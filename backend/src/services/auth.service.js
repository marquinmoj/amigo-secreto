import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js';
import { signToken } from '../utils/jwt.js';

export const register = async ({ name, email, password, role = 'AGENT' }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash, role } });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciales inválidas');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Credenciales inválidas');

  const token = signToken({ id: user.id, role: user.role, name: user.name });
  return { token, user: { id: user.id, name: user.name, role: user.role, email: user.email } };
};
