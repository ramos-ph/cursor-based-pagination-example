const express = require("express");
const router = require("./routes");
const { graphQLHandler } = require("./middlewares/graphql-handler");
const { graphQLUI } = require("./middlewares/graphql-ui");

const server = express();

server.use(express.json());
server.all("/graphql", graphQLHandler);
server.get("/", graphQLUI);
server.use(router);

server.listen(3000);

console.log("Server running at http://localhost:3000/");
