"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/game.json").map((el) => {
      delete el.id;

      el.createdAt = el.updatedAt = new Date();

      return el;
    });

    await queryInterface.bulkInsert("Games", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null);
  },
};
