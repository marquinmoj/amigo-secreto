import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as contactController from '../controllers/contact.controller.js';

const router = Router();
router.get('/', authMiddleware, contactController.listContacts);
router.post('/upsert', authMiddleware, validate(contactController.upsertContactSchema), contactController.upsertContact);

export default router;
