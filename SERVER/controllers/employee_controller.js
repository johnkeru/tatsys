const Employee = require("../models/employee");
const {
  numberFilter,
  dateFilter,
  textFilter,
  booleanFilter,
} = require("../utils/controller_get_process");

// Get all employees with filtering, searching, sorting, and pagination
exports.getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search, // Global search: searches across multiple fields
      orderBy,
      order = "asc",
      operator, // Used for numerical comparisons

      name,
      role,
      contact,
      dateHired,
    } = req.query;

    let query = {};

    // **Global Search (Excluding Date)**
    if (search && search.split("-").length !== 3) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { contact: { $regex: search, $options: "i" } },
      ];
    }

    // **Specific Field Search (Applied via Table Filters)**
    textFilter(query, { name, role, contact });
    dateFilter(query, { dateHired });

    // **Sorting**
    const sortByField = orderBy || "dateHired";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const sortQuery = { [sortByField]: sortOrder };

    // **Pagination**
    const pageNum = Math.max(1, Number(page)); // Ensure page is at least 1
    const limitNum = Math.max(1, Number(limit)); // Ensure limit is at least 1
    const skip = (pageNum - 1) * limitNum;

    // **Fetch filtered, paginated, and sorted data**
    const employees = await Employee.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery);
    const totalRecords = await Employee.countDocuments(query);

    return res.json({
      employees,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum,
      totalRecords,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Create a new employee entry
exports.addEmployee = async (req, res) => {
  try {
    const { name, role, contact, dateHired } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: "Name and role are required." });
    }

    if (!["Manager", "Artist", "Staff"].includes(role)) {
      return res.status(400).json({ error: "Invalid role provided." });
    }

    const newEmployee = new Employee({
      name,
      role,
      contact,
      dateHired: dateHired || Date.now(),
    });

    await newEmployee.save();
    return res.status(201).json({
      message: "Employee created successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create employee." });
  }
};

// Update an existing employee entry
exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, contact, dateHired } = req.body;

    if (role && !["Manager", "Artist", "Staff"].includes(role)) {
      return res.status(400).json({ error: "Invalid role provided." });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, role, contact, dateHired },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    return res.json({
      message: "Employee updated successfully.",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update employee." });
  }
};

// Delete an employee entry
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    return res.json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete employee." });
  }
};
