import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/natours/.env` });
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
const app = express();

//MIDDLEWARES
// Set Security HTTP Headers
app.use(helmet());

// Devlopement Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request Limiting Set To 100 Per Hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Body Parser Which Will Allow Us To Use req.body
app.use(express.json({ limit: '10kb' }));

// Serving Static Files
app.use(express.static(`${process.cwd()}/natours/public`));

app.use('/api', limiter);

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

// Middleware For Unmatched Routes
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
