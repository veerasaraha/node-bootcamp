import app from './app.js';
import mongoose from 'mongoose';

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
app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
