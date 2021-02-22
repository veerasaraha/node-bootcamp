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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour must have a name'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const PROT = process.env.PORT || 9000;
app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
