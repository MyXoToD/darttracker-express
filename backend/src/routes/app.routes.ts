import { Router } from 'express';
import authRoutes from './authRoutes';
import usersRouter from './users/users.routes';

const appRouter = Router();

appRouter.get('/', (req, res) => {
  res.send('Darttracker API');
});
appRouter.use('/auth', authRoutes);
appRouter.use('/users', usersRouter);

export default appRouter;
