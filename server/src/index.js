const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

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
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(config.PORT, () => {
    console.log(`IPFS server listening on port ${config.PORT}`);
  });
}

start();
