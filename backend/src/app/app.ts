import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env';
import { APP_CONSTANTS } from '../core/constants';
import { requestLogger, errorHandler, notFound } from '../core/middlewares';
import rootRouter from '../routes/index';

const app: Express = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: APP_CONSTANTS.RATE_LIMIT_WINDOW_MS,
  limit: env.NODE_ENV === 'production' ? APP_CONSTANTS.RATE_LIMIT_MAX_REQUESTS : 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: (req) => {
    // Never rate limit health checks
    if (req.path === '/health' || req.originalUrl === '/api/health') return true;
    
    // Skip autosave requests (PATCH /api/documents/:id)
    if (req.method === 'PATCH' && req.originalUrl.match(/\/api\/documents\/[0-9a-fA-F-]+$/)) return true;
    
    return false;
  }
});
app.use('/api', limiter);

// Request UUID and Logging
app.use(requestLogger);

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Router
app.use('/api', rootRouter);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
