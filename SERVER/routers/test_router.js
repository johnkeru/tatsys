const {
  getAllTests,
  addTest,
  editTest,
  deleteTest,
} = require("../controllers/test_controller");

const Router = require("express").Router;

const testRouter = Router();

// Get all tests
testRouter.get("/getAllTests", getAllTests);

// Add a new test
testRouter.post("/addTest", addTest);

// Edit an existing test
testRouter.put("/editTest/:id", editTest);

// Delete a test
testRouter.delete("/deleteTest/:id", deleteTest);

module.exports = testRouter;
