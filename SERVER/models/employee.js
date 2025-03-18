const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Manager", "Artist", "Staff"], required: true },
  contact: { type: String },
  dateHired: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
