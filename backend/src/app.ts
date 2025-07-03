import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import appRouter from './routes/app.routes';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', appRouter);

/*app.get('/users', async (req: Request, res: Response) => {
  const result = await db.query('SELECT * FROM users')
  res.send(result[0])
})

app.get('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const [queryresult, result] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

  if (result.length === 0) {
    return res.status(404).send('User not found');
  }
  res.send(result[0]);
})*/

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
