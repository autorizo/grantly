import jwt from 'jsonwebtoken';

export const generateToken = (user: any) =>
  jwt.sign(user, user.email, {
    expiresIn: '1h',
  });
