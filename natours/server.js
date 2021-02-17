import app from './app.js';

console.log(process.env.PORT, process.env.NODE_ENV);

const PROT = process.env.PORT || 9000;
app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
