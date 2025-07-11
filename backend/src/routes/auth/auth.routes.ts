import { Router } from 'express';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

const router = Router();

const userRepository = new UserRepository();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository, userRepository);
const authController = new AuthController(authService);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

export default router;
