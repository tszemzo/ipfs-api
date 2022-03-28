const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
const { User } = require('../models/user');

const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(403).send({ message: "No authorization provided!" });
  }
  
  const token = bearerToken.split(' ')[1]; // e.g: Bearer XXX-TOKEN-XXX
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const payload = jwt.verify(token, JWT_KEY);
    const existingUser = await User.findById(payload.id);
    if (!existingUser) {
      throw new Error('User does not exist or it was deleted!');
    }
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

module.exports = verifyToken;