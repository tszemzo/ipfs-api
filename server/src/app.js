const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require("./routes/user");
const keyRoutes = require("./routes/apiKey");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/key", keyRoutes);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

module.exports = app;
