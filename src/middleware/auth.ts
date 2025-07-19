import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/generateToken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = { id: decoded.user.id, email: decoded.user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err });
  }
};
