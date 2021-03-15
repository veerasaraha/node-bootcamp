const getOverview = (req, res, next) => {
  res.status(200).render('overview', { title: 'All tours' });
};

const getTour = (req, res, next) => {
  res.status(200).render('tour', { title: 'The Forest Hiker Tour' });
};

export { getOverview, getTour };
