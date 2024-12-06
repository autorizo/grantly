import jwt from 'jsonwebtoken';
import { Session } from './types';
import { AppError } from '@errors/index';

const scretKey = process.env.SECRET_KEY as string;

export const verifyToken = (token: string): Promise<Session | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, scretKey, (err, decoded) => {
      if (err) {
        // Token verification failed
        return reject(
          new AppError(403, 'Forbidden', ['Invalid or expired token'])
        );
      }
      // Token is valid, return the decoded payload
      resolve(decoded as Session);
    });
  });
};
