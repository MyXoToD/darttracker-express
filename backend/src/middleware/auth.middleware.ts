import dotenv from 'dotenv';
import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';
dotenv.config();

const getTokenFromHeaders = (req: Request) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return undefined;
};

const auth = {
  required: jwt({
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: jwt({
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
};

export default auth;
