import jwt from 'jsonwebtoken';
import { Session } from './types';

export const verifyRestoreToken = (token: string, email: string): Promise<Session | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, email, (err, decoded) => {
      if (err) {
        // Token verification failed
        return reject(null);
      }
      // Token is valid, return the decoded payload
      resolve(decoded as Session);
    });
  });
};
