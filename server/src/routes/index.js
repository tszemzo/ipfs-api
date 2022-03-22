const routes = require('express').Router();
const logger = require('../logger');

const userController = require('../controllers/user');
const apiKeyController = require('../controllers/apiKey');
const verifyToken = require('../middlewares/auth');

routes.post('/api/user/signup', signUp);
routes.post('/api/user/signin', signIn);

routes.get('/api/keys', [verifyToken], getApiKeys)
routes.post('/api/key', [verifyToken], createApiKey);
routes.post('/api/key/disable', [verifyToken], disableApiKey);

async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userController.signUp({ email, password });
    res.status(201).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ error: err.message });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userController.signIn({ email, password });
    res.status(200).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ message: err.message });
  }
}

async function createApiKey(req, res) {
  try {
    const { userId } = req;
    const response = await apiKeyController.createKey(userId);
    res.status(201).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ message: err.message });
  }
}

async function disableApiKey(req, res) {
  try {
    const { id } = req.body;
    const response = await apiKeyController.disableKey(id);
    res.status(200).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ message: err.message });
  }
}

async function getApiKeys(req, res) {
  try {
    const response = await apiKeyController.getKeys();
    res.status(200).send(response);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ message: err.message });
  }
}

module.exports = routes;
