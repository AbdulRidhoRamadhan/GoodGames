const axios = require("axios");
const { Game } = require("../models/game");

class apiController {
  static async getGame(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllGames(req, res, next) {
    try {
      const games = await Game.findAll();
      res.status(200).json({ games });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = apiController;
