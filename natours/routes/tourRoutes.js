import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
} from './../controllers/tourController.js';

import { protectRoute } from './../controllers/authController.js';

const tourRouter = express.Router();

tourRouter.route('/top-5-tours').get(aliasTopTours, getAllTours);

tourRouter.route('/tour-stats').get(getToursStats);

tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

tourRouter.route('/').get(protectRoute, getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;
