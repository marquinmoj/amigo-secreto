import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as chatController from '../controllers/chat.controller.js';

const router = Router();

router.post('/assign', authMiddleware, requireRole('ADMIN'), validate(chatController.assignSchema), chatController.manualAssign);
router.post('/:chatId/auto-assign', authMiddleware, chatController.autoAssign);

export default router;
