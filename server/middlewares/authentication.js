const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw { name: "UNAUTHORIZED" };
    }

    const token = bearerToken.split(" ")[1];

    const verified = verifyToken(token);

    const user = await User.findByPk(verified.id);

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    req.user = {
      id: verified.id,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
