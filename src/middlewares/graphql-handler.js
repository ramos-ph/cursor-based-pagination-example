const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");
const { listEntries } = require("../services/list-entries");

const root = {
  async entries() {
    const entries = await listEntries();
    return entries.data;
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
