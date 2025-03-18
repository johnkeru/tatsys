import React from "react";
import CustomPage from "../global/components/CustomPage";
import TextSearchable from "../global/components/TextSearchable";

const InventoryPage = () => {
  const inventorySchema = {
    item: {
      type: "reference",
      label: "Item",
      ref: "supplies",
      required: true,
      searchable: true,
      show: true,
    },
    quantityUsed: {
      type: "number",
      label: "Quantity Used",
      required: true,
      customRender: (row) => <TextSearchable columnName={row.quantityUsed} />,
      show: true,
    },
    dateUsed: {
      type: "date",
      label: "Date Used",
      show: true,
      default: new Date().toISOString().split("T")[0],
    },
    remarks: {
      type: "textarea",
      label: "Remarks",
      show: true,
    },
    action: {
      type: "action",
      label: "Actions",
    },
  };

  return <CustomPage dataListName="inventory" schema={inventorySchema} />;
};

export default InventoryPage;
