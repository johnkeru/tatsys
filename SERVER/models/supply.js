const mongoose = require("mongoose");

const SupplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., ink, needles, gloves
  quantity: { type: Number, required: true, default: 0 },
  supplier: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
});

const Supply = mongoose.model("Supply", SupplySchema);

module.exports = Supply;
