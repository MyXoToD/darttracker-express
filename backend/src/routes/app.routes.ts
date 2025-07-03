import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import usersRouter from './users/user.routes';

const appRouter = Router();

appRouter.get('/', (req, res) => {
  res.send('Darttracker API');
});
appRouter.use('/auth', authRoutes);
appRouter.use('/users', usersRouter);

export default appRouter;
