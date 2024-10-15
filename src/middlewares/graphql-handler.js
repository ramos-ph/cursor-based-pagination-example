const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const { paginateEntries } = require("../services/paginate-entries");

const root = {
  async entries({ first = 10, last, before, after }) {
    if (first && first < 0)
      throw new Error('Argument `first` cannot be negative.');
    if (last && last < 0) 
      throw new Error('Argument `last` cannot be negative.')
    
    const { data: entries, totalRecords } = await paginateEntries({
      first,
      last,
      before,
      after,
    });

    const edges = entries.map((entry) => ({
      node: entry,
      cursor: entry.id,
    }));

    return {
      edges: edges,
      pageInfo: {
        startCursor: edges.at(0)?.cursor || null,
        endCursor: edges.at(-1)?.cursor || null,
        hasNextPage: edges.length >= first,
        hasPreviousPage: !!after,
      },
      totalCount: totalRecords,
    };
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
