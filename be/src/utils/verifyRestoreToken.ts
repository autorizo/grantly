import jwt from 'jsonwebtoken';
import { Session } from './types';
import { AppError } from '@errors/index';

const secret = process.env.SECRET_KEY as string;
export const verifyRestoreToken = (token: string): Promise<Session | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new AppError(500, 'Internal Server Error', [
          'Token verification failed or expired',
        ]);
      }
      // Token is valid, return the decoded payload
      resolve(decoded as Session);
    });
  });
};
