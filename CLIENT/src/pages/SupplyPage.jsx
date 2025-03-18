import React from "react";
import CustomPage from "../global/components/CustomPage";
import TextSearchable from "../global/components/TextSearchable";

const SupplyPage = () => {
  const supplySchema = {
    name: {
      type: "text",
      label: "Name",
      required: true,
      searchable: true,
      show: true,
    },
    category: {
      type: "text",
      label: "Category",
      required: true,
      searchable: true,
      show: true,
    },
    quantity: {
      type: "number",
      label: "Quantity",
      default: 0,
      customRender: (row) => <TextSearchable columnName={row.quantity} />,
      show: true,
    },
    supplier: {
      type: "text",
      label: "Supplier",
      required: true,
      searchable: true,
      show: true,
    },
    purchaseDate: {
      type: "date",
      label: "Purchase Date",
      show: true,
      default: new Date().toISOString().split("T")[0],
    },
    expiryDate: {
      type: "date",
      label: "Expiry Date",
      show: true,
      required: true,
    },
    action: {
      type: "action",
      label: "Actions",
    },
  };

  return <CustomPage dataListName="supplies" schema={supplySchema} />;
};

export default SupplyPage;
