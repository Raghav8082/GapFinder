import { createClient } from 'redis';
import { ENV } from './env.js';

export let redis = null;

export const connectRedis = async () => {
  if (!ENV.REDIS_URL) {
    console.warn('Redis skipped — no REDIS_URL set');
    return;
  }

  redis = createClient({ url: ENV.REDIS_URL });
  redis.on('error', (err) => console.error('Redis error:', err));
  await redis.connect();
  console.log('Redis connected');
};