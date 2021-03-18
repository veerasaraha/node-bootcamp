import Tour from '../models/tourModel.js';
import catchAsync from '../utils/cathAsync.js';
import AppError from '../utils/appError.js';

const getOverview = catchAsync(async (req, res, next) => {
  // GET all tour data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All tours', tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 400));
  }

  res.status(200).render('tour', { title: `${tour.name} tour`, tour });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log inti your account',
  });
};

export { getOverview, getTour, getLoginForm };
