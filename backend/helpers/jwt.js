var jwt = require("jsonwebtoken");

const encodeToken = (payload) => {
  return jwt.sign(payload, "hamzah", { expiresIn: "24h" });
};

const encodeTokenAccessToken = (payload) => {
  return jwt.sign(payload, "hamzah", { expiresIn: "8h" });
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, "hamzah");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { encodeToken, decodeToken, encodeTokenAccessToken };
