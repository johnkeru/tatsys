# CustomPage Component Documentation

## Overview

`CustomPage` is a reusable component that provides a structured way to display and manage data in a table format. It includes functionalities for creating, updating, searching, and managing records.

## Props

### Required Props

| Prop Name      | Type     | Description                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `dataListName` | `string` | The name of the data list used to generate the API path and display titles.                                 |
| `schema`       | `object` | Defines the structure of the data, including field labels, types, visibility, and custom rendering options. |

### Optional Props

| Prop Name               | Type            | Default | Description                                                                            |
| ----------------------- | --------------- | ------- | -------------------------------------------------------------------------------------- |
| `title`                 | `string`        | `""`    | The title displayed on the page header. Defaults to the capitalized `dataListName`.    |
| `description`           | `string`        | `""`    | A short description displayed below the title. Defaults to `"Manage " + dataListName`. |
| `searchable`            | `bool`          | `true`  | Determines if the table should include a search functionality.                         |
| `hasEdit`               | `bool`          | `true`  | Enables the edit functionality for records.                                            |
| `hasDelete`             | `bool`          | `true`  | Enables the delete functionality for records.                                          |
| `hasAdd`                | `bool`          | `true`  | Determines if the add button should be displayed.                                      |
| `customAddElement`      | `React.Element` | `null`  | Custom UI element for adding a new record. If not provided, a default dialog is used.  |
| `customEditElement`     | `React.Element` | `null`  | Custom UI element for editing a record.                                                |
| `additionalMenuOptions` | `array`         | `[]`    | Extra menu options for each row in the table.                                          |

## Schema Object Structure

Each field in the `schema` object should have the following structure:

```js
schema: {
  fieldName: {
    label: "Field Label", // The displayed name of the column
    type: "string", // The data type (e.g., string, number, boolean, etc.)
    show: true, // Determines if the field should be displayed in the table
    searchable: false, // Highlights rows when searched if set to true
    customRender: (row) => <CustomComponent data={row} />, // Custom rendering logic for the field
    default: "Default Value", // The default value used when creating or updating records
  }
}
```

## Features and Functionalities

### 1. **Displaying Data in a Table**

- The table dynamically generates columns based on the `schema` object.
- The `show` property controls whether a field appears in the table.
- Action buttons (edit, delete, additional menu options) are included in the last column.

### 2. **Creating and Updating Records**

- Uses `CustomCreateUpdateDialog` for handling form submissions.
- Fields in the form are dynamically generated based on `schema`.
- Default values are applied from `default` in the schema if provided.

### 3. **Searching Records**

- The search bar appears in `DashboardHeader` if `searchable` is `true`.
- If a field is marked `searchable`, matching rows will be highlighted.

### 4. **Custom Rendering of Cells**

- If a field has `customRender`, the provided function is used to render the cell.

### 5. **Custom Menu Options**

- Additional menu actions can be added per row using `additionalMenuOptions`.
- Actions must include a `label`, an `icon`, and an `onClick` handler.

## Example Usage

```jsx
const schema = {
  name: {
    label: "Name",
    type: "string",
    show: true,
    searchable: true,
    default: "John Doe",
  },
  age: {
    label: "Age",
    type: "number",
    show: true,
    default: 18,
  },
  status: {
    label: "Status",
    type: "string",
    show: true,
    searchable: false,
    customRender: (row) => (
      <span style={{ color: row.status === "Active" ? "green" : "red" }}>
        {row.status}
      </span>
    ),
  },
};

<CustomPage
  dataListName="users"
  schema={schema}
  title="User Management"
  description="Manage registered users"
  searchable={true}
  hasEdit={true}
  hasDelete={true}
  hasAdd={true}
  additionalMenuOptions={[
    {
      label: "View Details",
      icon: <DetailsIcon />,
      onClick: (row) => console.log(row),
    },
  ]}
/>;
```

## Conclusion

The `CustomPage` component simplifies data management by automatically generating a user-friendly table and form based on the provided schema. It supports customization, including custom rendering, default values, and additional menu actions, making it a flexible solution for managing structured data.
