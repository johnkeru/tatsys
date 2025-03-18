const {
  getAllInventory,
  addInventory,
  editInventory,
  deleteInventory,
} = require("../controllers/inventory_controller");

const Router = require("express").Router;
const inventoryRouter = Router();

// Get all inventory records
inventoryRouter.get("/inventory", getAllInventory);

// Add a new inventory record
inventoryRouter.post("/inventory", addInventory);

// Edit an existing inventory record
inventoryRouter.put("/inventory/:id", editInventory);

// Delete an inventory record
inventoryRouter.delete("/inventory/:id", deleteInventory);

module.exports = inventoryRouter;
