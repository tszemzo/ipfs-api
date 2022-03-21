const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  IPFS: {
    HOST: process.env.IPFS_HOST || 'localhost',
    PORT: process.env.IPFS_PORT || 5001,
    PROTOCOL: process.env.IPFS_PROTOCOL || 'http',
  },
  MONGO: {
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || 27017,
    DB: process.env.MONGO_DB || 'ipfs_db',
  },
  JWT_KEY: process.env.JWT_SECRET
};
