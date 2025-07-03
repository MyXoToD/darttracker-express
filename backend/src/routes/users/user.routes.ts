import { Router } from 'express';
import userControlller from './user.controller';

const usersRouter = Router();

usersRouter.get('/', userControlller.getUsers);

usersRouter.get('/:id', userControlller.getUser);

export default usersRouter;
