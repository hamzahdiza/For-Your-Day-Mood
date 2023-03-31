const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { encodeToken } = require("../helpers/jwt");

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
      if (!comparePass) {
        throw { name: "invalid-login" };
      }

      let access_token = encodeToken({ id: userLogin.id });

      let sendUsername = userLogin.username;

      res.status(200).json({ access_token, sendUsername });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
