const { decodeToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    // const { access_token } = req.headers;
    // // console.log(req.headers);
    // if (!access_token) {
    //   throw { name: "invalid-token" };
    // }

    // const dataToken = decodeToken(access_token);

    const { access_token } = req.headers;
    console.log(access_token, "masuk sisinissiisi");

    if (!access_token) {
      throw { name: "invalid-token" };
    }

    const dataToken = decodeToken(access_token);

    console.log(dataToken, "DATA TOKEN");

    if (!dataToken) {
      throw { name: "token_expired" };
    }

    const dataUser = await User.findOne({
      where: {
        id: dataToken.id,
      },
    });

    if (!dataUser) {
      throw { name: "invalid-token" };
    }

    req.user = dataUser;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { authentication };
