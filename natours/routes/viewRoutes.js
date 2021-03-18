import express from 'express';
import * as viewController from './../controllers/viewsController.js';
import * as authController from './../controllers/authController.js';

const viewRouter = express.Router();

viewRouter.use(authController.isLoggedIn);

viewRouter.get('/', viewController.getOverview);
viewRouter.get('/tour/:slug', viewController.getTour);
viewRouter.get('/login', viewController.getLoginForm);

export default viewRouter;
