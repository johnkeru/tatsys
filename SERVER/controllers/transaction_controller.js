const Transaction = require("../models/transaction");
const Employee = require("../models/employee");
const Supply = require("../models/supply");
const { dateFilter, textFilter } = require("../utils/controller_get_process");
const { default: mongoose } = require("mongoose");

// Get all transactions with filtering, searching, sorting, and pagination
exports.getAllTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search, // Global search: searches across multiple fields
      orderBy,
      order = "asc",
      employee, // Employee ID
      date,
      notes,
    } = req.query;

    let query = {};

    // **Global Search (Excluding Date)**
    if (search && search.split("-").length !== 3) {
      query.$or = [{ notes: { $regex: search, $options: "i" } }];
    }

    // **Specific Field Search (Applied via Table Filters)**
    textFilter(query, { notes });
    dateFilter(query, { date });

    // If filtering by specific employee
    if (employee) {
      query.employee = employee;
    }

    // **Sorting**
    const sortByField = orderBy || "date";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const sortQuery = { [sortByField]: sortOrder };

    // **Pagination**
    const pageNum = Math.max(1, Number(page)); // Ensure page is at least 1
    const limitNum = Math.max(1, Number(limit)); // Ensure limit is at least 1
    const skip = (pageNum - 1) * limitNum;

    // **Fetch filtered, paginated, and sorted data**
    const transactions = await Transaction.find(query)
      .populate("employee", "name role") // Populate referenced Employee
      .populate("suppliesUsed.supply", "name category supplier") // Populate supply within suppliesUsed
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery);
    const totalRecords = await Transaction.countDocuments(query);

    return res.json({
      transactions,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum,
      totalRecords,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Create a new transaction record
exports.addTransaction = async (req, res) => {
  try {
    const { employee, suppliesUsed, date, notes } = req.body;

    if (!employee) {
      return res.status(400).json({ error: "Employee is required." });
    }

    // Check if the referenced employee exists
    const employeeExists = await Employee.findById(
      new mongoose.Types.ObjectId(employee)
    );
    if (!employeeExists) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Validate suppliesUsed array
    if (suppliesUsed && suppliesUsed.length > 0) {
      for (const item of suppliesUsed) {
        if (!item.supply || !item.quantityUsed || item.quantityUsed <= 0) {
          return res.status(400).json({
            error:
              "Each supply item must have a valid supply ID and positive quantity.",
          });
        }
        const supplyExists = await Supply.findById(item.supply);
        if (!supplyExists) {
          return res
            .status(404)
            .json({ error: `Supply with ID ${item.supply} not found.` });
        }
      }
    }

    const newTransaction = new Transaction({
      employee,
      suppliesUsed,
      date: date || Date.now(),
      notes,
    });

    await newTransaction.save();
    return res.status(201).json({
      message: "Transaction created successfully.",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create transaction." });
  }
};

// Update an existing transaction record
exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee, suppliesUsed, date, notes } = req.body;

    // If employee is being changed, check if the new employee exists
    if (employee) {
      const employeeExists = await Employee.findById(employee);
      if (!employeeExists) {
        return res.status(404).json({ error: "Employee not found." });
      }
    }

    // Validate suppliesUsed array
    if (suppliesUsed && suppliesUsed.length > 0) {
      for (const item of suppliesUsed) {
        if (!item.supply || !item.quantityUsed || item.quantityUsed <= 0) {
          return res.status(400).json({
            error:
              "Each supply item must have a valid supply ID and positive quantity.",
          });
        }
        const supplyExists = await Supply.findById(item.supply);
        if (!supplyExists) {
          return res
            .status(404)
            .json({ error: `Supply with ID ${item.supply} not found.` });
        }
      }
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { employee, suppliesUsed, date, notes },
      { new: true, runValidators: true }
    )
      .populate("employee", "name role")
      .populate("suppliesUsed.supply", "name category supplier");

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    return res.json({
      message: "Transaction updated successfully.",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update transaction." });
  }
};

// Delete a transaction record
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    return res.json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete transaction." });
  }
};
