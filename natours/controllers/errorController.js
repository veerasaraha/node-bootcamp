import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again', 401);

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidatonErrorDB = (err) => {
  const errors = Object.values(err.errors).map((ele) => ele.message);

  const message = `Invalid input data : ${errors.join('. ')} `;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // RENDERED WEBSITE
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    //operational, trusted error :send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      //programming or other unknown error: don't leak error details
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong  ',
      });
    }
  }
  // RENDERED WEBSITE
  //operational, trusted error :send message to client

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  //programming or other unknown error: don't leak error details
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later.',
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidatonErrorDB(error);
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    } else if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, req, res);
  }

  next();
};
