const express = require("express");
const col_controllers = require("../controllers/columns-controllers");

const router = express.Router();

router.get("/", col_controllers.getAllColumns);

router.get("/:id", col_controllers.getColumnById);

router.post("/", col_controllers.createColumn);

module.exports = router;
