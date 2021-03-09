import express from 'express';
import * as reviewController from './../controllers/reviewController.js';
import * as authController from './../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protectRoute);

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo('user'), reviewController.setUserandTourId, reviewController.createReview);

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);

export default reviewRouter;
