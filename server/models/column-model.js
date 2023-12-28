const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = new Schema({
  name: { type: String, required: true },
  cards: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Card" },
  ],
});

module.exports = mongoose.model("Column", columnSchema);
