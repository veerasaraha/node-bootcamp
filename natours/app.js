import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/natours/.env` });
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
const app = express();

//MIDDLEWARES
console.log(process.env.PORT, process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${process.cwd()}/natours/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

export default app;
