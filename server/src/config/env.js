import 'dotenv/config';

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

const required = ['MONGO_URI', 'REDIS_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
required.forEach(key => {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
});