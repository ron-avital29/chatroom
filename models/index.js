const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./models/database.sqlite3",
});

module.exports = sequelize;
