const knex = require("../database/knex");
const cursor = require("../utils/cursor-encoder");

const DEFAULT_PAGE_SIZE = 10;

exports.paginateEntries = async ({ first, after, last, before }) => {
  if (first < 0) throw new Error("Argument `first` cannot be negative.");
  if (last < 0) throw new Error("Argument `last` cannot be negative.");

  const entries = await getEntries({ first, after, last, before });
  const edges = edgesToReturn({ entries, first, last });
  const entriesCount = await countEntries();

  return {
    edges: edges,
    pageInfo: {
      startCursor: startCursor(edges),
      endCursor: endCursor(edges),
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalCount: entriesCount,
  };
};

async function getEntries({ first, after, last, before }) {
  const query = knex("entries")
    .select("*")
    .limit(first || last || DEFAULT_PAGE_SIZE);

  if (last) query.orderBy("id", "desc");
  if (after) query.where("id", ">", cursor.decode(after));
  if (before) query.where("id", "<", cursor.decode(before));

  const entries = await query;
  if (last) entries.reverse();
  return entries;
}

function edgesToReturn({ entries, first, last }) {
  return entries.map((entry) => ({
    node: {
      ...entry,
      createdAt: entry.created_at,
      updatedAt: entry.updated_at,
    },
    cursor: cursor.encode(entry.id),
  }));
}

async function countEntries() {
  const [{ count }] = await knex("entries").count({ count: "*" });
  return count;
}

function startCursor(edges) {
  const edge = edges.at(0);
  return edge?.cursor || null;
}

function endCursor(edges) {
  const edge = edges.at(-1);
  return edge?.cursor || null;
}
