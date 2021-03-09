import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setUserandTourId,
  getReview,
} from './../controllers/reviewController.js';
import { protectRoute, restrictTo } from './../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route('/').get(getAllReviews).post(protectRoute, restrictTo('user'), setUserandTourId, createReview);

reviewRouter.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

export default reviewRouter;
