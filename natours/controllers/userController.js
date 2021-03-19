import multer from 'multer';
import sharp from 'sharp';
import catchAsync from '../utils/cathAsync.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { deleteOne, updateOne, getOne, getAll } from './hanlderFactory.js';

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'natours/public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-id-timesStamp
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`natours/public/img/users/${req.file.filename}`);

  next();
});

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

  if (req.file) filteredBody.photo = req.file.filename;

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
  uploadUserPhoto,
  resizeUserPhoto,
};
