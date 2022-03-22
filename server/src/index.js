const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const logger = require('./logger');

const start = async () => {
  if (!config.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!config.MONGO.HOST || !config.MONGO.PORT || !config.MONGO.DB) {
    throw new Error('MONGO_HOST, MONGO_PORT and MONGO_DB must be defined');
  }

  try {
    const mongoURI = `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DB}`
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error(err);
  }

  app.listen(config.PORT, () => {
    logger.info(`IPFS server listening on port ${config.PORT}`);
  });
}

start();
