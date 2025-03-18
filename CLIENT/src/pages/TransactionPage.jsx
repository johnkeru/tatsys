import React from "react";
import CustomPage from "../global/components/CustomPage";
import AddTransactionDialog from "../components/transaction/AddTransactionDialog";
import TextSearchable from "../global/components/TextSearchable";

const TransactionPage = () => {
  const transactionSchema = {
    employee: {
      type: "reference",
      label: "Employee",
      ref: "employees",
      required: true,
      show: true,
      customRender: (row) => <TextSearchable columnName={row.employee.name} />,
    },
    suppliesUsed: {
      type: "reference",
      label: "Supplies Used",
      ref: "inventory",
      show: true,
    },
    date: {
      type: "date",
      label: "Transaction Date",
      show: true,
      default: new Date().toISOString().split("T")[0],
    },
    notes: {
      type: "textarea",
      label: "Notes",
      searchable: true,
      show: true,
    },
    action: {
      type: "action",
      label: "Actions",
    },
  };

  return (
    <CustomPage
      dataListName="transactions"
      customAddElement={<AddTransactionDialog />}
      hasEdit={false}
      additionalMenuOptions={[AddTransactionDialog]}
      schema={transactionSchema}
    />
  );
};

export default TransactionPage;
