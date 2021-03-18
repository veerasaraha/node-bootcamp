import express from 'express';
import * as userController from './../controllers/userController.js';
import * as authController from '../controllers/authController.js';
const userRouter = express.Router();

userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middlware
userRouter.use(authController.protectRoute);

userRouter.patch('/updatePassword/', authController.updatePassword);
userRouter.patch('/updateProfile', userController.updateMyProfile);
userRouter.delete('/deleteProfile', userController.deleteProfile);
userRouter.get('/getProfile', userController.setUserId, userController.getProfile);

// Restrict to only admins
userRouter.use(authController.restrictTo('admin'));

userRouter.route('/').get(userController.getAllUsers).post(userController.createUser);
userRouter.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

export default userRouter;
