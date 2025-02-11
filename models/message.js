"use strict";

const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const Message = sequelize.define(
  "Message",
  {
    msgId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    dateAndTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    modelName: "Message",
    validate: {
      async noMessageWithSameId() {
        const messages = await Message.findAll({ where: { msgId: this.msgId } });
        if (messages.length > 0) {
          throw new Error("Message ID must be unique");
        }
      },
    },
  }
);

module.exports = Message;
