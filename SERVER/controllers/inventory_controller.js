const Inventory = require("../models/inventory");
const Supply = require("../models/supply"); // Since Inventory references Supply
const {
  numberFilter,
  dateFilter,
  textFilter,
} = require("../utils/controller_get_process");

// Get all inventory records with filtering, searching, sorting, and pagination
exports.getAllInventory = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search, // Global search: searches across multiple fields
      orderBy,
      order = "asc",
      operator, // Used for numerical comparisons

      item, // Supply ID
      quantityUsed,
      dateUsed,
      remarks,
    } = req.query;

    let query = {};

    // **Global Search (Excluding Date)**
    if (search && search.split("-").length !== 3) {
      query.$or = [{ remarks: { $regex: search, $options: "i" } }];

      // Numeric search: If `search` is a number, search for matching `quantityUsed`
      const searchNumber = !isNaN(Number(search)) ? Number(search) : null;
      if (searchNumber !== null) {
        query.$or.push({ quantityUsed: searchNumber });
      }
    }

    // **Specific Field Search (Applied via Table Filters)**
    textFilter(query, { remarks });
    numberFilter(query, { quantityUsed }, operator);
    dateFilter(query, { dateUsed });

    // If filtering by specific supply item (Supply ID)
    if (item) {
      query.item = item;
    }

    // **Sorting**
    const sortByField = orderBy || "dateUsed";
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const sortQuery = { [sortByField]: sortOrder };

    // **Pagination**
    const pageNum = Math.max(1, Number(page)); // Ensure page is at least 1
    const limitNum = Math.max(1, Number(limit)); // Ensure limit is at least 1
    const skip = (pageNum - 1) * limitNum;

    // **Fetch filtered, paginated, and sorted data**
    const inventory = await Inventory.find(query)
      .populate("item", "name category supplier") // Populate referenced Supply
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery);
    const totalRecords = await Inventory.countDocuments(query);

    return res.json({
      inventory,
      totalPages: Math.ceil(totalRecords / limitNum),
      currentPage: pageNum,
      totalRecords,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Create a new inventory record
exports.addInventory = async (req, res) => {
  try {
    const { item, quantityUsed, dateUsed, remarks } = req.body;

    if (!item || !quantityUsed) {
      return res
        .status(400)
        .json({ error: "Item and quantity used are required." });
    }

    // Check if the referenced supply item exists
    const supplyItem = await Supply.findById(item);
    if (!supplyItem) {
      return res.status(404).json({ error: "Supply item not found." });
    }

    const newInventory = new Inventory({
      item,
      quantityUsed,
      dateUsed: dateUsed || Date.now(),
      remarks,
    });

    await newInventory.save();
    return res.status(201).json({
      message: "Inventory record created successfully.",
      inventory: newInventory,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create inventory record." });
  }
};

// Update an existing inventory record
exports.editInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, quantityUsed, dateUsed, remarks } = req.body;

    // If item is being changed, check if the new supply item exists
    if (item) {
      const supplyItem = await Supply.findById(item);
      if (!supplyItem) {
        return res.status(404).json({ error: "Supply item not found." });
      }
    }

    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { item, quantityUsed, dateUsed, remarks },
      { new: true, runValidators: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ error: "Inventory record not found." });
    }

    return res.json({
      message: "Inventory record updated successfully.",
      inventory: updatedInventory,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update inventory record." });
  }
};

// Delete an inventory record
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ error: "Inventory record not found." });
    }

    return res.json({ message: "Inventory record deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete inventory record." });
  }
};
