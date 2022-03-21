const routes = require('express').Router();
const userController = require('../controllers/user');

routes.post('/signup', signUp);
routes.post('/signin', signIn);
routes.post('/logout', async (req, res) => {
  res.status(204);
});

async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userController.signUp({ email, password });
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userController.signIn({ email, password });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = routes;
