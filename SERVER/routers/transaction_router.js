const {
  getAllTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction_controller");

const Router = require("express").Router;
const transactionRouter = Router();

// Get all transactions
transactionRouter.get("/transactions", getAllTransactions);

// Add a new transaction
transactionRouter.post("/transactions", addTransaction);

// Edit an existing transaction
transactionRouter.put("/transactions/:id", editTransaction);

// Delete a transaction
transactionRouter.delete("/transactions/:id", deleteTransaction);

module.exports = transactionRouter;
