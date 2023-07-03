const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { encodeToken, decodeToken, encodeTokenAccessToken } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      console.log(email, password);

      let userRegister = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({ message: "Register Successfully", userRegister });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "invalid-login" };
      }

      if (!password) {
        throw { name: "invalid-login" };
      }

      let userLogin = await User.findOne({
        where: {
          email,
        },
      });

      if (!userLogin) {
        throw { name: "invalid-login" };
      }

      let comparePassword = await comparePass(password, userLogin.password);
      if (!comparePassword) {
        throw { name: "invalid-login" };
      }

      let token = encodeToken({ id: userLogin.id });

      let sendUsername = userLogin.username;

      res.status(200).json({ token, sendUsername });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async token(req, res, next) {
    try {
      const { token } = req.body;
      console.log(token, "LLLLLLL");

      if (!token) {
        throw { name: "invalid-token" };
      }

      const dataToken = decodeToken(token);

      console.log(dataToken, "dataToken<<<<<<<<<<<<<<<<<<<<<<s");

      const access_token = encodeTokenAccessToken({ id: dataToken.id });
      res.status(200).json({ access_token: access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
