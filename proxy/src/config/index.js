const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  IPFS_URL: process.env.IPFS_URL || 'http://127.0.0.1:5001',
  PORT: process.env.PORT || 4000,
  MONGO: {
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || 27017,
    DB: process.env.MONGO_DB || 'ipfs_db',
  },
};
