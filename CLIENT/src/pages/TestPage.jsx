import React from "react";
import CreateUpdateTestDialog from "../components/test/CreateUpdateTestDialog";
import MenuTest from "../components/test/MenuTest";
import CustomTable from "../global/components/CustomTable";
import DashboardHeader from "../global/components/DashboardHeader";
import TextSearchable from "../global/components/TextSearchable";

const TestPage = () => {
  return (
    <>
      {/* Dashboard header with title, description, and an add test dialog */}
      <DashboardHeader
        title="Test Page"
        description="Manage the list of test data"
        childElement={<CreateUpdateTestDialog />}
        searchable
      />

      {/* Custom table to display test data */}
      <CustomTable
        dataListName="tests"
        apiPath="/getAllTests"
        columns={[
          {
            field: "title", // Field name corresponding to the database/model column
            label: "Title", // Column label displayed in the table header
            type: "text", // Defines the data type (e.g., text, number, boolean, additionally the 'action')
            searchable: true, // Enables searching in this column
          },
          {
            field: "description",
            label: "Description",
            type: "text",
            searchable: true,
          },
          {
            field: "likes",
            label: "Likes",
            type: "number",
            searchable: true,
            render: (row) => <TextSearchable columnName={row.likes} />, // Custom render function for displaying the "Likes" column
          },
          {
            field: "isPublish",
            label: "Publish",
            type: "boolean", // Boolean field to indicate if the test is published
          },
          {
            field: "createdAt",
            label: "Created At",
            type: "date", // Displays the date when the test was created
            searchable: true,
          },
          {
            field: "action",
            label: "Action",
            type: "action", // Defines an action column for interactive elements
            render: (row) => <MenuTest row={row} />, // Renders an edit dialog for each row
          },
        ]}
      />
    </>
  );
};

export default TestPage;
