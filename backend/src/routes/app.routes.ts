import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import authRoutes from './auth/auth.routes';
import gamesRouter from './games/game.routes';
import usersRouter from './users/user.routes';

const appRouter = Router();

appRouter.get('/', (req, res) => {
  res.status(200).json({ api: 'Darttracker API' });
});
appRouter.use('/auth', authRoutes);
appRouter.use('/users', auth.required, usersRouter);
appRouter.use('/games', auth.required, gamesRouter);

export default appRouter;
