const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  created: {
    type: mongoose.Schema.Types.Date,
  },
  createdBy: {
    type: String,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    }
  ]
});

const ApiKey = mongoose.model(
  "ApiKey",
  apiKeySchema
);

module.exports = { ApiKey };