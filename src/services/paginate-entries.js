const knex = require("../database/knex");

exports.paginateEntries = async ({ first, last, before, after } = {}) => {
  if (first && first < 0)
    throw new Error("Argument `first` cannot be negative.");
  if (last && last < 0) throw new Error("Argument `last` cannot be negative.");

  const query = knex("entries")
    .limit(first)
    .select("*", "created_at as createdAt", "updated_at as updatedAt");

  if (after) {
    query.where("id", ">", after);
  }

  const entries = await query;

  const edges = entries.map((entry) => ({
    node: entry,
    cursor: entry.id,
  }));

  const entriesCount = await countEntries();

  return {
    edges: edges,
    pageInfo: {
      startCursor: edges.at(0)?.cursor || null,
      endCursor: edges.at(-1)?.cursor || null,
      hasNextPage: edges.length >= first,
      hasPreviousPage: !!after,
    },
    totalCount: entriesCount,
  };
};

async function countEntries() {
  const [{ count }] = await knex("entries").count({ count: "*" });
  return count;
}
