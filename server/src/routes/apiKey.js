const routes = require('express').Router();
const logger = require('../logger');

const apiKeyController = require('../controllers/apiKey');
const verifyToken = require('../middlewares/auth');

routes.get('/all', [verifyToken], getApiKeys)
routes.post('', [verifyToken], createApiKey);
routes.post('/disable', [verifyToken], disableApiKey);

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
