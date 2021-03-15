import * as path from 'path';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/natours/.env` });
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoute.js';
const app = express();

//MIDDLEWARES
// Set Security HTTP Headers
app.use(helmet());

// Devlopement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request limiting set to 100 per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Body parser which will allow us to use req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// preventing param pollution
app.use(
  hpp({
    whitelist: ['price', 'duration', 'maxGroupSize', 'difficulty', 'ratingsQuantity', 'ratingsAverage'],
  })
);

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/natours/views`);

// Serving static files
app.use(express.static(`${process.cwd()}/natours/public`));

app.use('/api', limiter);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.get('/', (req, res, next) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'jonas',
  });
});

app.get('/overview', (req, res, next) => {
  res.status(200).render('overview', { title: 'All tours' });
});

app.get('/tour', (req, res, next) => {
  res.status(200).render('tour', { title: 'The Forest Hiker Tour' });
});

app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// Middleware for unmatched routes
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler middleware
app.use(globalErrorHandler);

console.log(`${process.cwd()}/natours`);

export default app;
