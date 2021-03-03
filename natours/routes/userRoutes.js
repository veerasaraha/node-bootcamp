import express from 'express';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from './../controllers/userController.js';
import { signUp, login, resetPassword, forgotPassword } from '../controllers/authController.js';
const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
