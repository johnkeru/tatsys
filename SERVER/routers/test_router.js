const {
  getAllTests,
  addTest,
  editTest,
  deleteTest,
} = require("../controllers/test_controller");

const Router = require("express").Router;

const testRouter = Router();

// Get all tests
testRouter.get("/tests", getAllTests);

// Add a new test
testRouter.post("/tests", addTest);

// Edit an existing test
testRouter.put("/tests/:id", editTest);

// Delete a test
testRouter.delete("/tests/:id", deleteTest);

module.exports = testRouter;
