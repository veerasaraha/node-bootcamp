import express from 'express';
import { getAllReviews, createReview } from './../controllers/reviewController.js';
import { protectRoute, restrictTo } from './../controllers/authController.js';
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route('/').get(getAllReviews).post(protectRoute, restrictTo('user'), createReview);

export default reviewRouter;
