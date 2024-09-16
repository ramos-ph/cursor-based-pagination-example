const { ruruHTML } = require("ruru/server");

exports.graphQLUI = (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
};
