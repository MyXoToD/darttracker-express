import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '1h', // TODO: Add to env file
  });
};
