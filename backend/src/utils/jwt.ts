import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
dotenv.config();

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue,
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue, // e.g. '7d'
  });
};

export const getExpirationDate = (token: string, secret: string) => {
  const { exp } = jwt.verify(token, secret) as { exp: number };
  return new Date(exp * 1000);
};

export const decodeToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
