import app from './app.js';
import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! Shutting down...! ');
  console.log(err.name, err.message);
});

// DB Connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection successful`));

const PROT = process.env.PORT || 9000;
const server = app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...! ');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
