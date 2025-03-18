const Supply = require("../models/supply");
const {
  numberFilter,
  dateFilter,
  textFilter,
} = require("../utils/controller_get_process");

// Get all supplies with filtering, searching, sorting, and pagination
exports.getAllSupplies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search, // Global search: searches across multiple fields
      orderBy,
      order = "asc",
      operator, // Used for numerical comparisons

      name,
      category,
      supplier,
      quantity,
      purchaseDate,
      expiryDate,
    } = req.query;

    let query = {};

    // **Global Search (Excluding Date)**
    if (search && search.split("-").length !== 3) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { supplier: { $regex: search, $options: "i" } },
      ];

      // Numeric search: If `search` is a number, search for matching `quantity`
      const searchNumber = !isNaN(Number(search)) ? Number(search) : null;
      if (searchNumber !== null) {
        query.$or.push({ quantity: searchNumber });
      }
    }

    // **Specific Field Search (Applied via Table Filters)**
    textFilter(query, { name, category, supplier });
    numberFilter(query, { quantity }, operator);
    dateFilter(query, { purchaseDate, expiryDate });

    // **Sorting**
    const sortByField = orderBy || "purchaseDate";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const sortQuery = { [sortByField]: sortOrder };

    // **Pagination**
    const pageNum = Math.max(1, Number(page)); // Ensure page is at least 1
    const limitNum = Math.max(1, Number(limit)); // Ensure limit is at least 1
    const skip = (pageNum - 1) * limitNum;

    // **Fetch filtered, paginated, and sorted data**
    const supplies = await Supply.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery);

    const totalRecords = await Supply.countDocuments(query);
    return res.json({
      supplies,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum,
      totalRecords,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Create a new supply entry
exports.addSupply = async (req, res) => {
  try {
    const { name, category, quantity, supplier, purchaseDate, expiryDate } =
      req.body;

    if (!name || !category || !supplier) {
      return res
        .status(400)
        .json({ error: "Name, category, and supplier are required." });
    }

    const newSupply = new Supply({
      name,
      category,
      quantity: quantity || 0,
      supplier,
      purchaseDate: purchaseDate || Date.now(),
      expiryDate,
    });

    await newSupply.save();
    return res
      .status(201)
      .json({ message: "Supply created successfully.", supply: newSupply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create supply." });
  }
};

// Update an existing supply entry
exports.editSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, supplier, purchaseDate, expiryDate } =
      req.body;

    const updatedSupply = await Supply.findByIdAndUpdate(
      id,
      { name, category, quantity, supplier, purchaseDate, expiryDate },
      { new: true, runValidators: true }
    );

    if (!updatedSupply) {
      return res.status(404).json({ error: "Supply not found." });
    }

    return res.json({
      message: "Supply updated successfully.",
      supply: updatedSupply,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update supply." });
  }
};

// Delete a supply entry
exports.deleteSupply = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSupply = await Supply.findByIdAndDelete(id);
    if (!deletedSupply) {
      return res.status(404).json({ error: "Supply not found." });
    }

    return res.json({ message: "Supply deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete supply." });
  }
};
