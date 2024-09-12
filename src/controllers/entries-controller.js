const knex = require("../database/knex");

exports.index = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  const entries = await knex("entries")
    .offset(size * (page - 1))
    .select("*")
    .limit(size)
    .orderBy("id", "desc");

  const [{ count }] = await knex("entries").count({ count: "*" });

  return res.send({
    data: entries,
    page_number: Number(page),
    size: Number(size),
    total_records: count,
  });
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
