const knex = require("../database/knex");
const { listEntries } = require("../services/list-entries");

exports.index = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  const entries = await listEntries({ page, size });

  return res.send(entries);
};

exports.store = async (req, res) => {
  const { value, operation, description } = req.body;

  await knex("entries").insert({
    value,
    operation,
    description,
  });

  return res.status(201).send();
};

exports.show = async (req, res) => {
  const { id } = req.params;

  const entry = await knex("entries").where({ id }).select("*").first();

  if (!entry) return res.status(404).send();

  return res.send(entry);
};
