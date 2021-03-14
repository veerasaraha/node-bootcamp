import express from 'express';
import * as tourController from './../controllers/tourController.js';

import * as authController from './../controllers/authController.js';
import reviewRouter from './../routes/reviewRoute.js';

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter.route('/top-5-tours').get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route('/tour-stats').get(tourController.getToursStats);

tourRouter
  .route('/monthly-plan/:year')
  .get(authController.protectRoute, authController.restrictTo('admin', 'lead-guide'), tourController.getMonthlyPlan);

tourRouter.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);

// tour-within?distance=236&center=-41,45&unit=mi
// tour-within/236/center/-41,45/unit/mi

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protectRoute, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protectRoute, authController.restrictTo('admin', 'lead-guide'), tourController.updateTour)
  .delete(authController.protectRoute, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// tourRouter.route('/:tourId/reviews').post(protectRoute, restrictTo('user'), createReview);

export default tourRouter;
