const express = require("express");

const EntriesController = require("./controllers/entries-controller");

const router = express.Router();

router.get("/entries", EntriesController.index);
router.get("/entries/:id", EntriesController.show);
router.post("/entries", EntriesController.store);

module.exports = router;
