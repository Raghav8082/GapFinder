import 'dotenv/config';

export const ENV = {
  PORT:                 process.env.PORT || 5000,
  MONGO_URI:            process.env.MONGO_URI,
  REDIS_URL:            process.env.REDIS_URL,
  JWT_SECRET:           process.env.JWT_SECRET,
  JWT_REFRESH_SECRET:   process.env.JWT_REFRESH_SECRET,
  CLIENT_URL:           process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV:             process.env.NODE_ENV || 'development',
  GOOGLE_CLIENT_ID:     process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SERVER_URL:           process.env.SERVER_URL || 'http://localhost:5000',
  GMAIL_USER:           process.env.GMAIL_USER,
  GMAIL_APP_PASSWORD:   process.env.GMAIL_APP_PASSWORD,
};

const required = ['MONGO_URI', 'REDIS_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GMAIL_USER', 'GMAIL_APP_PASSWORD'];
required.forEach(key => {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
});