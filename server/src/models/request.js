const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  path: {
    type: String,
    default: '',
  },
  method: {
    type: String,
    default: '',
  },
  bytes: {
    type: Number,
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
  apiKey: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ApiKey"
  },
});

const Request = mongoose.model(
  "Request",
  requestSchema
);

module.exports = { Request };