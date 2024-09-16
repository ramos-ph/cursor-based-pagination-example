const knex = require("../database/knex");

exports.listEntries = async ({ page = 1, size = 10 } = {}) => {
  const entries = await knex("entries")
    .offset(size * (page - 1))
    .select("*")
    .limit(size)
    .orderBy("id", "desc");

  const [{ count }] = await knex("entries").count({ count: "*" });

  return {
    data: entries,
    page_number: Number(page),
    size: Number(size),
    total_records: count,
  };
};
