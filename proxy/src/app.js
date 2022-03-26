const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');
const { validateApiKey, saveRequest } = require('./middlewares');

const app = express();

app.use(validateApiKey);

const ipfsProxy = createProxyMiddleware({
  target: config.IPFS_URL,
  changeOrigin: true,
  onProxyReq: saveRequest,
});

app.use(ipfsProxy);

module.exports = app;
