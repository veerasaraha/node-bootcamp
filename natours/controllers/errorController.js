export default (err, req, res, next) => {
  // console.log(err.stack + 'FROM GLOBAL ERROR CLASS');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
};
