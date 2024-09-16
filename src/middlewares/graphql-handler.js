const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const { paginateEntries } = require("../services/paginate-entries");

const root = {
  async entries({ first, last, before, after }) {
    const { data: entries, total_records } = await paginateEntries();

    return {
      edges: entries.map((entry) => ({
        node: entry,
        cursor: entry.id,
      })),
      pageInfo: {
        startCursor: "1",
        endCursor: "10",
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: total_records,
    };
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
