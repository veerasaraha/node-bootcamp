import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
} from './../controllers/tourController.js';

const tourRouter = express.Router();

tourRouter.route('/top-5-tours').get(aliasTopTours, getAllTours);

tourRouter.route('/tour-stats').get(getToursStats);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default tourRouter;
