import express from 'express';
import * as viewController from './../controllers/viewsController.js';
import * as authController from './../controllers/authController.js';

const viewRouter = express.Router();

// viewRouter.use(authController.isLoggedIn);

viewRouter.get('/', authController.isLoggedIn, viewController.getOverview);
viewRouter.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
viewRouter.get('/login', authController.isLoggedIn, viewController.getLoginForm);
viewRouter.get('/myprofile', authController.protectRoute, viewController.getMyprofile);

export default viewRouter;
