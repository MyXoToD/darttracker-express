import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import appRouter from './routes/app.routes';
import { errorHandler } from './shared/error-handler/error-handler.middleware';
dotenv.config();

const app = express();
const whitelist = [
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:4200',
  'https://ominous-enigma-vrwp6r79xjhw6r6-4200.app.github.dev',
];
var corsOptions = {
  origin: function (origin: any, callback: any) {
    // "!origin" to allow requests from rest tools
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', appRouter);
app.use(errorHandler);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   // TODO: Add custom error object
//   // res.status(err.status).json({ error: err.name, message: err.message });
//   res.json({ error: err.name, messgae: err.message });
//   next();
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
