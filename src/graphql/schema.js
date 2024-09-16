const fs = require("node:fs");
const path = require("path");
const { buildSchema } = require("graphql");

const schemaPath = path.resolve(__dirname, "schema.graphql");
const schema = buildSchema(fs.readFileSync(schemaPath, "utf-8"));

module.exports = schema;
