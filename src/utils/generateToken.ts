import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const generateToken = (user: object): string => {
  return jwt.sign({ user }, config.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};
export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET as string);
  } catch (error) {
    console.log(error);
    return null;
  }
};
