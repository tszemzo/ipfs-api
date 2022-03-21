const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

module.exports = verifyToken;