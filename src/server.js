const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const router = require("./routes");
const schema = require("./graphql/schema");

const server = express();

const root = {
  entries() {
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
