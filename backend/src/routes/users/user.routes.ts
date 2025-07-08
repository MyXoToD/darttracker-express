import { Router } from 'express';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const usersRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', userController.getUser);

export default usersRouter;
