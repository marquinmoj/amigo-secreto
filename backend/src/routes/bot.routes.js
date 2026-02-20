import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as botController from '../controllers/bot.controller.js';

const router = Router();
router.get('/', authMiddleware, botController.getConfig);
router.put('/', authMiddleware, requireRole('ADMIN'), validate(botController.botSchema), botController.saveConfig);

export default router;
