import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';
import catchAsync from '../utils/cathAsync.js';
import AppError from '../utils/appError.js';
import sendEmail from './../utils/email.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
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
  createSendToken(user, 200, res);
});

const protectRoute = catchAsync(async (req, res, next) => {
  let token;

  // getting token and check of it's there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Your are not logged in! please log in to get access', 401));
  }

  //Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user beloging to this token does no longer exist', 401));
  }
  //check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  //get user based on Pposted email
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  //generate the random token
  const resetToken = user.createpasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send email
  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a  request with you new password and passwordConfirm to : ${resetURL}. \n If you didn't forgot your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending email. Try again later', 500));
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  //get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

  //if token has not expired and there is user then set new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //update changePassowerdAt property
  //log the user in and sent JWT
  createSendToken(user, 200, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
  // get user from collection

  const user = await User.findById(req.user.id).select('+password');

  //check is POSTed current password is correct
  if (!(await user.verifyPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  //If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //log userin send JWT
  createSendToken(user, 200, res);
});

export { signUp, login, protectRoute, restrictTo, resetPassword, forgotPassword, updatePassword };
