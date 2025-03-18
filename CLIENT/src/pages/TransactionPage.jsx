import React from "react";
import CustomPage from "../global/components/CustomPage";
import AddTransactionDialog from "../components/transaction/AddTransactionDialog";

const TransactionPage = () => {
  const transactionSchema = {
    employee: {
      type: "reference",
      label: "Employee",
      ref: "employees",
      required: true,
      searchable: true,
      show: true,
    },
    suppliesUsed: {
      type: "reference",
      label: "Supplies Used",
      ref: "inventory",
      multiple: true,
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
