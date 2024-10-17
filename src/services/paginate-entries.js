const knex = require("../database/knex");

const DEFAULT_PAGE_SIZE = 10;

exports.paginateEntries = async ({ first, after, last, before }) => {
  if (first < 0) throw new Error("Argument `first` cannot be negative.");
  if (last < 0) throw new Error("Argument `last` cannot be negative.");

  const entries = await getEntries({ first, after, last, before });

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

async function getEntries({ first, after, last, before }) {
  const query = knex("entries").select(
    "*",
    "created_at as createdAt",
    "updated_at as updatedAt"
  );

  query.limit((first || last || DEFAULT_PAGE_SIZE) + 1);
  if (last) query.orderBy("id", "desc");
  if (after) query.where("id", ">", after);
  if (before) query.where("id", "<", before);

  const entries = await query;
  return entries;
}

async function countEntries() {
  const [{ count }] = await knex("entries").count({ count: "*" });
  return count;
}
