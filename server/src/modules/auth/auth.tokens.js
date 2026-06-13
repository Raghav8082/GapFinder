import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import { redis } from '../../config/redis.js';

export const signAccessToken = (userId) =>
  jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (userId) =>
  jwt.sign({ userId }, ENV.JWT_REFRESH_SECRET, { expiresIn: '30d' });

export const blacklistToken = async (token) => {
  await redis.set(`bl:${token}`, '1', { EX: 60 * 60 * 24 * 30 });
};

export const isBlacklisted = async (token) =>
  !!(await redis.get(`bl:${token}`));