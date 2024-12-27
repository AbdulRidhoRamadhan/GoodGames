const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class userController {
  static async postRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EMAIL_REQUIRED" };
      }

      if (!password) {
        throw { name: "PASS_REQUIRED" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "UNAUTHENTICATED" };
      }

      const compared = comparePass(password, user.password);

      if (!compared) {
        throw { name: "UNAUTHENTICATED" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client();
      console.log(req.headers, "<-- dari google-login");

      const ticket = await client.verifyIdToken({
        idToken: req.headers.googletoken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload, "<-- payload");

      let user = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        user = await User.create(
          {
            email: payload.email,
            password: "googlelogin",
          },
          {
            hooks: false,
          }
        );
      } else {
        if (user.password !== "googlelogin") {
          throw { name: "GoogleLoginFailed" };
        }
      }

      const access_token = signToken({
        id: user.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
