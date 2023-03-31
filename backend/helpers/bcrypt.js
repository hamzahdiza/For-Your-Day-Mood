const bcrypt = require("bcrypt");

const hash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePass = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword); // true
};

module.exports = { hash, comparePass };
