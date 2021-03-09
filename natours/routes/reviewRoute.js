import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setUserandTourId,
} from './../controllers/reviewController.js';
import { protectRoute, restrictTo } from './../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route('/').get(getAllReviews).post(protectRoute, restrictTo('user'), setUserandTourId, createReview);

reviewRouter.route('/:id').patch(updateReview).delete(deleteReview);

export default reviewRouter;
