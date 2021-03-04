import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMyProfile,
  deleteProfile,
} from './../controllers/userController.js';
import {
  signUp,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protectRoute,
} from '../controllers/authController.js';
const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.patch('/updatePassword/', protectRoute, updatePassword);

userRouter.patch('/updateProfile', protectRoute, updateMyProfile);
userRouter.delete('/deleteProfile', protectRoute, deleteProfile);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
