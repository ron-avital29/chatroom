"use strict";

const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Message = require("./message");

const Contact = sequelize.define(
  "Contact",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [3, 32],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [3, 32],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 32],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicSrc: {
      type: DataTypes.STRING,
      defaultValue: "/images/bear.png",
    },
  },
  {
    modelName: "Contact",
  }
);

Contact.hasMany(Message);
Message.belongsTo(Contact);

module.exports = { Contact, Message };
