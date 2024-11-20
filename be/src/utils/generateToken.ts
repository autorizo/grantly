import jwt from 'jsonwebtoken';
import { Session } from './types';
const scretKey = process.env.SECRET_KEY as string;

export const generateToken = (session: Session) =>
  jwt.sign(session, scretKey, {
    expiresIn: '1h',
  });