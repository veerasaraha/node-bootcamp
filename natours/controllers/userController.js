import catchAsync from '../utils/cathAsync.js';
import User from '../models/userModel.js';

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

export { getAllUsers, createUser, getUser, updateUser, deleteUser };
