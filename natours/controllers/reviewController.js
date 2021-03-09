import Review from './../models/reviewModel.js';
// import catchAsync from '../utils/cathAsync.js';
import { deleteOne, updateOne, createOne, getOne, getAll } from './hanlderFactory.js';

const setUserandTourId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createReview = createOne(Review);
const getAllReviews = getAll(Review);
const getReview = getOne(Review);
const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);

export { createReview, getAllReviews, deleteReview, updateReview, setUserandTourId, getReview };
