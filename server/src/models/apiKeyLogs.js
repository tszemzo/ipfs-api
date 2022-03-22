const mongoose = require("mongoose");

const apiKeyLogsSchema = new mongoose.Schema({
  apiKeyId: {
    type: String,
    required: true
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
  },
  bytes: {
    type: Number,
  }
});

const ApiKeyLogs = mongoose.model(
  "ApiKeyLogs",
  apiKeyLogsSchema
);

module.exports = { ApiKeyLogs };