"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      // ..
      // Session.belongsTo(models.User, {
      //   as: "therapist",
      //   foreignKey: "therapistId",
      // });
      // Session.belongsTo(models.User, { as: "client", foreignKey: "clientId" });
      Session.belongsTo(models.User, {
        foreignKey: "therapistId",
        as: "therapist",
      });
      Session.belongsTo(models.User, { foreignKey: "clientId", as: "client" });
    }
  }

  Session.init(
    {
      therapistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("available", "scheduled", "completed"),
        defaultValue: "available",
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Session",
      timestamps: true,
      indexes: [
        {
          fields: ["therapistId"],
        },
        {
          fields: ["clientId"],
        },
      ],
    }
  );

  return Session;
};
