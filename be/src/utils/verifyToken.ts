import jwt from 'jsonwebtoken';
import { Session } from './types';
import { AppError } from '@errors/index';

const secretKey = process.env.SECRET_KEY as string;

export const verifyToken = (token: string): Promise<Session> => {
  return new Promise((resolve, reject) => {
    if (!secretKey) {
      return reject(
        new AppError(500, 'Internal Server Error', ['Secret key missing'])
      );
    }

    const decoded = jwt.decode(token);

    if (!decoded) {
      return reject(new AppError(403, 'Forbidden', ['Invalid token format']));
    }

    jwt.verify(token, secretKey, (err, verifiedPayload) => {
      if (err) {
        return reject(
          new AppError(403, 'Forbidden', [
            'Failed token verify, invalid or expired token',
          ])
        );
      }

      resolve(verifiedPayload as Session);
    });
  });
};
