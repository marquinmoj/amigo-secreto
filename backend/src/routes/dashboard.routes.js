import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { overview } from '../controllers/dashboard.controller.js';

const router = Router();
router.get('/', authMiddleware, overview);

export default router;
