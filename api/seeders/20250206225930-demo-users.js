"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Dr Trent Reznor",
        email: "trent@example.com",
        password: await bcrypt.hash("12345", 10),
        role: "therapist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PJ Harvey",
        email: "pj@example.com",
        password: await bcrypt.hash("12345", 10),
        role: "therapist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David Bowie",
        email: "david@example.com",
        password: await bcrypt.hash("12345", 10),
        role: "client",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eric Clapton",
        email: "eric@example.com",
        password: await bcrypt.hash("12345", 10),
        role: "client",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
