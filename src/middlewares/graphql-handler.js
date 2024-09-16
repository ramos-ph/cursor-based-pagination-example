const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("../graphql/schema");

const root = {
  entries() {
    return "Hello, World!";
  },
};

exports.graphQLHandler = createHandler({
  schema: schema,
  rootValue: root,
});
