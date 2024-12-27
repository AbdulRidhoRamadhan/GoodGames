"use strict";
const { hashPass } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json").map((el) => {
      delete el.id;
      el.password = hashPass(el.password);
      el.createdAt = el.updatedAt = new Date();

      return el;
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
