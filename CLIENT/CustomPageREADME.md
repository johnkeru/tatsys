# CustomPage Component - README

## Overview

The `CustomPage` component is a reusable React component designed to simplify the creation of dynamic pages that display, search, add, edit, and delete data entries. It integrates seamlessly with custom tables, modals, and menu options to provide a smooth user experience.

## Features

- **Dynamic Page Title & Description**: Automatically generates page titles and descriptions based on `dataListName`.
- **Customizable Table Columns**: Configurable columns based on the provided `schema`.
- **CRUD Operations**: Built-in support for adding, editing, and deleting records.
- **Searchable Fields**: Enables search functionality for specified columns.
- **Customizable Actions**: Supports custom add and edit elements, as well as additional menu options.
- **Integration with API**: Uses `apiPath` derived from `dataListName` to interact with backend services.

## Installation & Usage

### Installation

Ensure you have the required dependencies installed:

```bash
npm install prop-types
```

### Usage Example

```jsx
import React from "react";
import CustomPage from "../global/components/CustomPage";
import TextSearchable from "../global/components/TextSearchable";

const TestPage = () => {
  const testSchema = {
    title: {
      type: "text",
      label: "Title",
      required: true,
      searchable: true,
      show: true,
    },
    description: {
      type: "textarea",
      label: "Description",
      searchable: true,
      show: true,
    },
    likes: {
      type: "number",
      label: "Likes",
      default: 0,
      searchable: false,
      customRender: (row) => <TextSearchable columnName={row.likes} />,
      show: true,
    },
    isPublish: {
      type: "boolean",
      label: "Published",
      default: true,
      searchable: false,
      show: true,
    },
    action: {
      type: "action",
      label: "Actions",
    },
  };
  return <CustomPage dataListName="tests" schema={testSchema} />;
};

export default TestPage;
```

## Props

### Required Props

| Prop           | Type     | Description                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------- |
| `dataListName` | `string` | Name of the data list (used for API path, title, and description).                 |
| `schema`       | `object` | Defines the structure of the table, including column visibility and searchability. |

### Optional Props

| Prop                    | Type            | Default  | Description                                                                           |
| ----------------------- | --------------- | -------- | ------------------------------------------------------------------------------------- |
| `title`                 | `string`        | `""`     | Custom page title. Defaults to `dataListName` if not provided.                        |
| `description`           | `string`        | `""`     | Custom description for the page. Defaults to `Manage {dataListName}` if not provided. |
| `searchable`            | `bool`          | `true`   | Enables search functionality for the page.                                            |
| `hasEdit`               | `bool`          | `true`   | Enables edit functionality in the action menu.                                        |
| `hasDelete`             | `bool`          | `true`   | Enables delete functionality in the action menu.                                      |
| `hasAdd`                | `bool`          | `true`   | Enables the add button and form.                                                      |
| `customAddElement`      | `React.Element` | `null`   | Allows custom UI for adding new entries.                                              |
| `customEditElement`     | `React.Element` | `null`   | Allows custom UI for editing existing entries.                                        |
| `additionalMenuOptions` | `array`         | `[]`     | Adds extra menu actions beyond the default edit and delete options.                   |
| `tableHeight`           | `string`        | `"auto"` | Defines the height of the table.                                                      |
| `pageSize`              | `number`        | `10`     | Specifies the number of rows per page.                                                |

## Schema Configuration

The `schema` object defines how the table columns will be displayed.

### Schema Properties

| Property       | Type       | Description                                                                           |
| -------------- | ---------- | ------------------------------------------------------------------------------------- |
| `label`        | `string`   | Display name for the column.                                                          |
| `type`         | `string`   | Specifies the type of data (`text`, `textarea`, `number`, `boolean`, `action`, etc.). |
| `show`         | `bool`     | Determines whether the column should be displayed.                                    |
| `searchable`   | `bool`     | Determines if the column should be included in search queries.                        |
| `customRender` | `function` | A custom function to render the column's content.                                     |
| `default`      | `any`      | Default value for the field.                                                          |

## How It Works

1. The component generates a page header (`DashboardHeader`) with a title, description, and an optional search bar.
2. It initializes a table (`CustomTable`) based on the provided `schema`, filtering out fields that should not be displayed.
3. The table includes an action column (`CustomMenu`) that allows editing and deleting records.
4. If enabled, an `add` button is displayed to allow adding new records via `CustomCreateUpdateDialog`.
5. The component dynamically builds API paths using `dataListName` for fetching and managing data.
6. Additional table options like `tableHeight` and `pageSize` improve flexibility in display.

## Extending Functionality

- Override `customAddElement` or `customEditElement` to provide a custom UI for adding or editing entries.
- Use `additionalMenuOptions` to include extra menu options for each row.
- Modify `customRender` within `schema` to control how specific data fields are displayed.

## Conclusion

The `CustomPage` component provides a robust and flexible way to manage data-driven pages in a React application. By leveraging its schema-based approach, developers can easily create dynamic pages with minimal code repetition.
