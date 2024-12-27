"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Game.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title name is required",
          },
          notEmpty: {
            msg: "Title name is required",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      metacritic_rating: DataTypes.INTEGER,
      release_date: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
