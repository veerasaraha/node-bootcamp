import app from './app.js';
const PROT = 9090;
app.listen(PROT, () => {
  console.log(`App running on port ${PROT}...`);
});
