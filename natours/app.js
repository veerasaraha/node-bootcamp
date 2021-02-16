import express from 'express';
import { readFileSync, writeFile } from 'fs';

const app = express();
const PROT = 9090;

//middleware
app.use(express.json());

const filePath = `${process.cwd()}/natours/devData/data`;

const tours = JSON.parse(readFileSync(`${filePath}/toursSimple.json`, 'utf-8'));

//get all tours data
app.get('/api/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//get each tour data
app.get('/api/tours/:id', (req, res) => {
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
});

//post new tour data
app.post('/api/tours', (req, res) => {
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
});

//patch tour data
app.patch('/api/tours/:id', (req, res) => {
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
});

//delete tour data
app.delete('/api/tours/:id', (req, res) => {
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
});

app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
