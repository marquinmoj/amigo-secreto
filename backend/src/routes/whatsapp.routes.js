import { Router } from 'express';
import * as whatsappController from '../controllers/whatsapp.controller.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const whatsappRoutes = (io) => {
  const router = Router();

  router.get('/', authMiddleware, whatsappController.listNumbers);
  router.post('/', authMiddleware, requireRole('ADMIN'), validate(whatsappController.createNumberSchema), whatsappController.createNumber);
  router.post('/:numberId/connect', authMiddleware, requireRole('ADMIN'), whatsappController.connectNumber(io));

  return router;
};

export default whatsappRoutes;
