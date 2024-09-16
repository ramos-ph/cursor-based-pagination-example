const knex = require("../database/knex");

exports.paginateEntries = async ({ first, last, before, after } = {}) => {
  const query = knex("entries").limit(first).select("*");

  if (after) {
    query.where("id", ">", after);
  }

  const entries = await query;

  const [{ count }] = await knex("entries").count({ count: "*" });

  return {
    data: entries.map((entry) => ({
      ...entry,
      createdAt: entry.created_at.toString(),
      updatedAt: entry.updated_at.toString(),
    })),
    total_records: count,
  };
};
