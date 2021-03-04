import catchAsync from '../utils/cathAsync.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

const filterObj = (userObj, ...allowedFields) => {
  const newObj = {};
  Object.keys(userObj).map((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = userObj[el];
    }
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const updateMyProfile = catchAsync(async (req, res, next) => {
  //create error if user try update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for update password. Please use /updatePassword', 400));
  }

  // filtering fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout not yet defined',
  });
};

export { getAllUsers, createUser, getUser, updateUser, deleteUser, updateMyProfile };
