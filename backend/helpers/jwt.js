var jwt = require("jsonwebtoken");

const encodeToken = (payload) => {
  return jwt.sign(payload, "hamzah");
};

const decodeToken = (token) => {
  return jwt.verify(token, "hamzah");
};

module.exports = { encodeToken, decodeToken };
