const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

function startServer() {
  app.listen(PORT, () => {
    console.log(`IPFS server listening on port ${PORT}`);
  });
}

startServer();
