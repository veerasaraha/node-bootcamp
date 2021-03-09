import catchAsync from '../utils/cathAsync.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { deleteOne, updateOne, getOne, getAll } from './hanlderFactory.js';

const filterObj = (userObj, ...allowedFields) => {
  const newObj = {};
  Object.keys(userObj).map((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = userObj[el];
    }
  });
  return newObj;
};

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

const deleteProfile = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not  defined! please use siggup instead',
  });
};

const getAllUsers = getAll(User);
const getUser = getOne(User);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

const setUserId = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
const getProfile = getOne(User);

export {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMyProfile,
  deleteProfile,
  setUserId,
  getProfile,
};
