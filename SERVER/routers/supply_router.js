const {
  getAllSupplies,
  addSupply,
  editSupply,
  deleteSupply,
} = require("../controllers/supply_controller");

const Router = require("express").Router;
const supplyRouter = Router();

// Get all supplies
supplyRouter.get("/supplies", getAllSupplies);

// Add a new supply
supplyRouter.post("/supplies", addSupply);

// Edit an existing supply
supplyRouter.put("/supplies/:id", editSupply);

// Delete a supply
supplyRouter.delete("/supplies/:id", deleteSupply);

module.exports = supplyRouter;
