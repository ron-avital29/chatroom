const { Sequelize } = require("sequelize");

/**
 * Creates a new instance of Sequelize.
 * @returns {Sequelize} The Sequelize instance.
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

module.exports = sequelize;
