import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

export const setupServer = async () => {
  await connectMongoDB();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/auth', authRoutes);
  app.use(notesRoutes);
  app.use(errors());
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
