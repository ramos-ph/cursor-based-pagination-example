const path = require("path");

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite3",
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds")
  }
};
