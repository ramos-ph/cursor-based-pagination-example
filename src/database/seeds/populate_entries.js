/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("entries").del()

  await knex("entries").insert([
    { id: 1, description: "Entry 1", operation: "credit", value: 118_99 },
    { id: 2, description: "Entry 2", operation: "debit", value: 155_39 },
    { id: 3, description: "Entry 3", operation: "credit", value: 14_00 },
    { id: 4, description: "Entry 4", operation: "credit", value: 3123_59 },
    { id: 5, description: "Entry 5", operation: "debit", value: 10_00 },
    { id: 6, description: "Entry 6", operation: "credit", value: 1256_68 },
    { id: 7, description: "Entry 7", operation: "credit", value: 1256_68 },
    { id: 8, description: "Entry 8", operation: "debit", value: 173_99 },
    { id: 9, description: "Entry 9", operation: "debit", value: 149_99 },
    { id: 10, description: "Entry 10", operation: "credit", value: 10_00 },
  ]);
};
