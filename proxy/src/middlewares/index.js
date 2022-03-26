const logger = require('../logger');
const { Request } = require("../models/request");
const { ApiKey } = require("../models/apiKey");

async function validateApiKey(req, res, next) {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new Error('Not Authorized - Missing token');
    }
    
    const apiKey = authToken.split(' ')[1]; // e.g: Bearer XXX-API-KEY-XXX
    if (!apiKey) {
      throw new Error('Not Authorized - Missing API Key');
    }

    const existingKey = await ApiKey.findOne({ id: apiKey });
    if (!existingKey) {
      throw new Error('Not Authorized - API Key not found or invalid');
    }

    if (existingKey.disabled) {
      throw new Error(`Key ${existingKey} is disabled`);
    }

    res.locals.apiKey = existingKey;
    next();
  } catch (err) {
    logger.error(err.message);
    res.status(401).send({ message: err.message });
  }  
};

async function saveRequest(proxyRequest, req, res) {
  const { apiKey } = res.locals; 
  const { method, path } = req;
  // Some clients might not send this header, so an improval of how to get bytes might be added in the future
  const bytes = req.headers['content-length'] || 0; 
  try {
    const request = new Request({
      path,
      method,
      bytes,
      createdAt: new Date(),
      apiKey: apiKey._id
    })
    await request.save();

    // Update the list of requests
    await ApiKey.findOneAndUpdate(
      { _id: apiKey._id },
      { $push: { requests: request._id } }
    )
    logger.info(`Transferring ${bytes} bytes from request: ${method} ${path}`);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  validateApiKey,
  saveRequest,
}