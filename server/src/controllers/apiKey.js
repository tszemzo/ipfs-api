const uuidAPIKey = require('uuid-apikey');

const { ApiKey } = require('../models/apiKey');

async function create(createdBy) {
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

async function disable(id) {
  const existingKey = await ApiKey.findOne({ id });
  if (!existingKey) {
    throw new Error(`Key "${id}" is invalid`);
  }
  existingKey.set({ disabled: true });
  await existingKey.save();
  return existingKey;
}

const self = {
  create,
  disable
};

module.exports = self;
