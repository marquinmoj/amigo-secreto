import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  databaseUrl: process.env.DATABASE_URL,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
