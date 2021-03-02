import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';
import catchAsync from '../utils/cathAsync.js';
import AppError from '../utils/appError.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //chekc if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password ', 401));
  }

  //if everything ok, send JWT to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

const protectRoute = catchAsync(async (req, res, next) => {
  let token;

  // getting token and check of it's there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Your are not logged in! please log in to get access'));
  }

  //Verification token

  //check if user still exists

  //check if user changed password after the token was issued

  next();
});

export { signUp, login, protectRoute };
