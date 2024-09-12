/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("entries", (table) => {
    table.increments("id");

    table.string("description").notNullable();
    table.string("operation").notNullable(); // credit | debit
    table.integer("value").notNullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entries");
};
