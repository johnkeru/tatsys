import React from "react";
import CustomPage from "../global/components/CustomPage";

const EmployeePage = () => {
  const employeeSchema = {
    name: {
      type: "text",
      label: "Name",
      required: true,
      searchable: true,
      show: true,
    },
    role: {
      type: "select",
      label: "Role",
      options: ["Manager", "Artist", "Staff"],
      required: true,
      searchable: true,
      show: true,
    },
    contact: {
      type: "text",
      label: "Contact",
      searchable: true,
      show: true,
    },
    dateHired: {
      type: "date",
      label: "Date Hired",
      show: true,
    },
    action: {
      type: "action",
      label: "Actions",
    },
  };

  return <CustomPage dataListName="employees" schema={employeeSchema} />;
};

export default EmployeePage;
