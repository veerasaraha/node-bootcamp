import Tour from '../models/tourModel.js';
import catchAsync from '../utils/cathAsync.js';

const getOverview = catchAsync(async (req, res, next) => {
  // GET all tour data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All tours', tours });
});

const getTour = (req, res, next) => {
  res.status(200).render('tour', { title: 'The Forest Hiker Tour' });
};

export { getOverview, getTour };
