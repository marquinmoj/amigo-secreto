import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as pipelineController from '../controllers/pipeline.controller.js';

const router = Router();

router.get('/', authMiddleware, pipelineController.listPipeline);
router.post('/stages', authMiddleware, requireRole('ADMIN'), validate(pipelineController.stageSchema), pipelineController.createStage);
router.patch('/opportunities/:id/move', authMiddleware, validate(pipelineController.moveSchema), pipelineController.moveOpportunity);

export default router;
