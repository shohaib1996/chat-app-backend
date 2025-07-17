import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '@/config';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.NEXTAUTH_SECRET as string) as {
      id: string;
      email: string;
    };
    req.user = { id: decoded.id, email: decoded.email }; // ✅ attach to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err });
  }
};
