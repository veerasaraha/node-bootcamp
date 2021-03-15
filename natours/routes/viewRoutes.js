import express from 'express';
import * as viewController from './../controllers/viewsController.js';

const viewRouter = express.Router();

viewRouter.get('/', viewController.getOverview);
viewRouter.get('/tour/:slug', viewController.getTour);

export default viewRouter;
