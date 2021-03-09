import express from 'express';
import { getAllReviews, createReview, deleteReview } from './../controllers/reviewController.js';
import { protectRoute, restrictTo } from './../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route('/').get(getAllReviews).post(protectRoute, restrictTo('user'), createReview);

reviewRouter.route('/:id').delete(deleteReview);

export default reviewRouter;
