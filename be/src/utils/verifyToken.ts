import jwt from 'jsonwebtoken';
import { Session } from './types';

const scretKey = process.env.SECRET_KEY as string;

export const verifyToken = (token: string): Promise<Session | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, scretKey, (err, decoded) => {
      if (err) {
        // Token verification failed
        return reject(null);
      }
      // Token is valid, return the decoded payload
      resolve(decoded as Session);
    });
  });
};
