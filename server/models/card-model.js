const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true },
  column: { type: mongoose.Types.ObjectId, required: true, ref: "Column" },
});

module.exports = mongoose.model("Card", cardSchema);
