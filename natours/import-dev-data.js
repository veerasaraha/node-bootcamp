import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/tourModel.js';
import Review from './models/reviewModel.js';
import User from './models/userModel.js';

dotenv.config();

// DB Connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection successful...`));

// READ json File
const tours = JSON.parse(readFileSync('./devData/data/tours.json', { encoding: 'utf-8' }));
const users = JSON.parse(readFileSync('./devData/data/users.json', { encoding: 'utf-8' }));
const reviews = JSON.parse(readFileSync('./devData/data/reviews.json', { encoding: 'utf-8' }));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data successfuly deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
