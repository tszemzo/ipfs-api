const createIPFS = require('ipfs-http-client');
const config = require('./config');

const IPFS = createIPFS({
  host: config.IPFS.HOST,
  port: config.IPFS.PORT,
  protocol: config.IPFS.PROTOCOL,
});

module.exports = IPFS;
