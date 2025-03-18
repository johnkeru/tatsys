const {
  getAllEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employee_controller");

const Router = require("express").Router;
const employeeRouter = Router();

// Get all employees
employeeRouter.get("/employees", getAllEmployees);

// Add a new employee
employeeRouter.post("/employees", addEmployee);

// Edit an existing employee
employeeRouter.put("/employees/:id", editEmployee);

// Delete an employee
employeeRouter.delete("/employees/:id", deleteEmployee);

module.exports = employeeRouter;
