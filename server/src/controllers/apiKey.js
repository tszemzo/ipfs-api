const uuidAPIKey = require('uuid-apikey');
const logger = require('../logger');

const { ApiKey } = require('../models/apiKey');

async function createKey(createdBy) {
  const { apiKey } = uuidAPIKey.create();
  const key = new ApiKey({
    id: apiKey,
    created: new Date(),
    createdBy
  });
  await key.save();
  logger.info(`ApiKey ${apiKey} created successfully`);
  return key;
}

async function disableKey(id) {
  const existingKey = await ApiKey.findOne({ id });
  if (!existingKey) {
    throw new Error(`Key "${id}" is invalid`);
  }
  existingKey.set({ disabled: true });
  await existingKey.save();
  logger.info(`ApiKey ${id} disabled successfully`);
  return existingKey;
}

async function getKeys(includeLogs = true) {
  if (includeLogs) {
    const apiKeys = ApiKey.aggregate([{
      // Include logs to our Api Keys
      $lookup: {
        from: "ApiKeyLogs",
        localField: "id",
        foreignField: "apiKeyId",
        as: "logs"
      }
    }]);
    return apiKeys;
  } else {
    return ApiKey.find();
  }
}

const self = {
  createKey,
  disableKey,
  getKeys
};

module.exports = self;
