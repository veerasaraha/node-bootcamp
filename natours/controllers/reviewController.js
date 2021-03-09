import Review from './../models/reviewModel.js';
import catchAsync from '../utils/cathAsync.js';
import { deleteOne, updateOne, createOne } from './hanlderFactory.js';

const setUserandTourId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createReview = createOne(Review);

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);

export { createReview, getAllReviews, deleteReview, updateReview, setUserandTourId };
