const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const { paginateEntries } = require("../services/paginate-entries");

const root = {
  async entries({ first, last, before, after }) {
    const { data: entries, total_records } = await paginateEntries({
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
        startCursor: edges.at(0).cursor,
        endCursor: edges.at(-1).cursor,
        hasNextPage: first < total_records,
        hasPreviousPage: !!after,
      },
      totalCount: total_records,
    };
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
