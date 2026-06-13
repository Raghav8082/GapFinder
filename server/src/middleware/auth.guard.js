import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { isBlacklisted } from '../modules/auth/auth.tokens.js';

export const authGuard = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  if (await isBlacklisted(token))
    return res.status(401).json({ message: 'Token revoked' });

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};