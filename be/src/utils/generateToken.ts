import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY as string;
export const generateToken = (user: any) =>
  jwt.sign(user, secret, {
    expiresIn: '15m',
    issuer: 'auth-service',
    audience: 'user',
  });
