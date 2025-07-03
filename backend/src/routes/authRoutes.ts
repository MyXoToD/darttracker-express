import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.get('/login', authController.login);

export default router;
