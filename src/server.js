const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { ruruHTML } = require("ruru/server");
const router = require("./routes");

const server = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello() {
    return "Hello, World!";
  },
};

server.use(express.json());

server.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

server.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

server.use(router);

server.listen(3000);

console.log("Server running at http://localhost:3000/");
