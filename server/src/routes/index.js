const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

routes.post('/login', async (req, res) => {
  res.status(200);
});

routes.post('/logout', async (req, res) => {
  res.status(200);
});

module.exports = routes;
