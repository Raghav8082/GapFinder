import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { connectRedis } from './config/redis.js';
import { ENV } from './config/env.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const start = async () => {
  await connectDB();
  await connectRedis();
  app.listen(ENV.PORT, () => console.log(`Server on port ${ENV.PORT}`));
};

start();