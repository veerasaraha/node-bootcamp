import express from 'express';
import morgan from 'morgan';
const app = express();
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

export default app;
