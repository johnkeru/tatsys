const mongoose = require("mongoose");

const suppliesUsedSchema = mongoose.Schema({
  quantityUsed: { type: Number, default: 0 },
  supply: { type: mongoose.Schema.Types.ObjectId, ref: "Supply" },
});

const TransactionSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  suppliesUsed: [suppliesUsedSchema],
  date: { type: Date, default: Date.now },
  notes: { type: String },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
