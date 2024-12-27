const { Game } = require("../models");

class PopularController {
  static async getAllGames(req, res, next) {
    try {
      const games = await Game.findAll();
      res.status(200).json({ games });
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id);
      if (!game) {
        throw { name: "NOT_FOUND" };
      }
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }

  static async addGame(req, res, next) {
    try {
      const { title, imgUrl, genre, metacritic_rating, release_date } =
        req.body;
      const newGame = await Game.create({
        title,
        imgUrl,
        genre,
        metacritic_rating,
        release_date,
        userId: req.user.id,
      });

      res.status(201).json(newGame);
    } catch (error) {
      next(error);
    }
  }

  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const { title, imgUrl, genre, metacritic_rating, release_date } =
        req.body;
      const updatedGame = await Game.update(
        {
          title,
          imgUrl,
          genre,
          metacritic_rating,
          release_date,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      res.status(200).json(updatedGame);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.destroy({ where: { id } });

      if (!game) {
        throw { name: "NOT_FOUND" };
      }

      res.status(200).json({ message: "Game deleted successfully" });
    } catch (error) {
      console.log(error, "ini error");
      next(error);
    }
  }
}

module.exports = PopularController;
