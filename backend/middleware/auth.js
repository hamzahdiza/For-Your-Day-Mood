const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "invalid-token" };
    }

    const dataToken = decodeToken(access_token);

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
