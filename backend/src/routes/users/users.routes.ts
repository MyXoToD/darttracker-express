import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  res.send('Users root');
});

export default usersRouter;
