import express from 'express';
import { readFileSync, writeFile } from 'fs';
import morgan from 'morgan';
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const filePath = `${process.cwd()}/natours/devData/data`;

const tours = JSON.parse(readFileSync(`${filePath}/toursSimple.json`, 'utf-8'));

//HANDLER FUNCTIONS
//get all tours data
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

//get each tour data
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//post new tour data
const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  writeFile(`${filePath}/toursSimple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

//patch tour data
const updateTour = (req, res) => {
  const id = req.params.id;
  if (id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated your tour data...',
    },
  });
};

//delete tour data
const deleteTour = (req, res) => {
  const id = req.params.id;

  if (id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This rout not yet defined',
  });
};

//ROUTES
app.route('/api/tours').get(getAllTours).post(createTour);
app.route('/api/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/users').get(getAllUsers).post(createUser);
app.route('/api/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const PROT = 9090;
app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
