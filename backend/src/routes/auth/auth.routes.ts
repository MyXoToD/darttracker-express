import { Router } from 'express';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
