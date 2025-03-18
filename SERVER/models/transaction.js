const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  suppliesUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supply" }],
  date: { type: Date, default: Date.now },
  notes: { type: String },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
