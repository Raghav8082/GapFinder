import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { connectDB } from './src/config/db.js';
import { connectRedis } from './src/config/redis.js';
import { ENV } from './src/config/env.js';
import { initPassport } from './src/config/passport.js';
import authRoutes from './src/modules/auth/auth.routes.js';
import skillmapRoutes from './src/modules/skillmap/skillmap.routes.js';
import { errorHandler } from './src/middleware/errorhandler.js';

const app = express();

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

initPassport();
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/skillmap', skillmapRoutes);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await connectRedis();
  app.listen(ENV.PORT, () => console.log(`Server on port ${ENV.PORT}`));
};

start();