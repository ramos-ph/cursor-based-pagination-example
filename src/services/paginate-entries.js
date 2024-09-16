const knex = require("../database/knex");

exports.paginateEntries = async ({ first, last, before, after } = {}) => {
  const entries = await knex("entries").select("*");

  const [{ count }] = await knex("entries").count({ count: "*" });

  return {
    data: entries,
    total_records: count,
  };
};