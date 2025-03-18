const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Supply", required: true },
  quantityUsed: { type: Number, required: true },
  dateUsed: { type: Date, default: Date.now },
  remarks: { type: String },
});
const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
