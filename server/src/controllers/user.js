const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const logger = require('../logger');

const { User } = require('../models/user');
const { JWT_KEY } = require('../config');
const { validateEmail, validatePassword } = require('../utils/validator');

const TOKEN_EXPIRATION = 86400; // 24hs

const signUp = async ({ email, password }) => {
  if (!email || !validateEmail(email)) {
    throw new Error('Email must be valid');
  }
  if (!password || !validatePassword(password)) {
    throw new Error('Password must be between 8 and 20 characters');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Failed! Email is already in use!');
  }

  const user = new User({
    email: email,
    password: bcrypt.hashSync(password, 8)
  });
  await user.save();
  logger.info(`User ${email} created successfully`);
  return {
    id: user._id,
    email: user.email,
  };
};

const signIn = async ({ email, password }) => {
  if (!email || !validateEmail(email)) {
    throw new Error('Email must be valid');
  }
  if (!password) {
    throw new Error('You must supply a password');
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error('Invalid credentials');
  }

  const passwordsMatch = bcrypt.compareSync(password, existingUser.password);
  if (!passwordsMatch) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign({ id: existingUser.id }, JWT_KEY, {
    expiresIn: TOKEN_EXPIRATION
  });

  return {
    id: existingUser._id,
    email: existingUser.email,
    accessToken: token
  };
};

const self = {
  signUp,
  signIn
};

module.exports = self;
