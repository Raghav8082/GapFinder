import { createClient } from 'redis';
import { ENV } from './env.js';

export const redis = createClient({ url: ENV.REDIS_URL });
redis.on('error', (err) => console.error('Redis error:', err));

export const connectRedis = async () => {
  await redis.connect();
  console.log('Redis connected');
};