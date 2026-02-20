import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', validate(authController.registerSchema), authController.register);
router.post('/login', validate(authController.loginSchema), authController.login);

export default router;
