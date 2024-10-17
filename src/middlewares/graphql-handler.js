const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const { paginateEntries } = require("../services/paginate-entries");

const root = {
  async entries({ first, last, before, after }) {
    return await paginateEntries({
      first,
      last,
      before,
      after,
    });
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
