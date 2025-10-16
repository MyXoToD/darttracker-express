import { NextFunction, Request, Response } from 'express';
import { CustomError } from './custom-error.class';

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error.stack);
  // TODO: Add custom error object
  // res.status(err.status).json({ error: err.name, message: err.message });
  if (!error.code) {
    error.code = 500;
  }
  res.status(error.code).send(error.message);
  next();
};
