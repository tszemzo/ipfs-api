const uuidAPIKey = require('uuid-apikey');

const { ApiKey } = require('../models/apiKey');

async function createKey(createdBy) {
  const { apiKey } = uuidAPIKey.create();
  const key = new ApiKey({
    id: apiKey,
    created: new Date(),
    createdBy
  });
  await key.save();
  console.log(`ApiKey ${apiKey} created successfully`);
  return key;
}

async function disableKey(id) {
  const existingKey = await ApiKey.findOne({ id });
  if (!existingKey) {
    throw new Error(`Key "${id}" is invalid`);
  }
  existingKey.set({ disabled: true });
  await existingKey.save();
  return existingKey;
}

async function getKeys() {
  const apiKeys = await ApiKey.find(); // Add an ApiKeyLogs an include it here on this get
  // format if necessary
  return apiKeys;
}

const self = {
  createKey,
  disableKey,
  getKeys
};

module.exports = self;
