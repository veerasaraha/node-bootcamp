// import { readFileSync, writeFile } from 'fs';

// const filePath = `${process.cwd()}/natours/devData/data`;
// const tours = JSON.parse(readFileSync(`${filePath}/toursSimple.json`, 'utf-8'));

//MIDDLEWARE FUNCTIONS
// const checkID = (req, res, next, value) => {
//   const id = Number(value);
//   if (id >= tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price ',
    });
  }

  next();
};

//HANDLER FUNCTIONS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

const createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated your tour data...',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour, checkBody };
