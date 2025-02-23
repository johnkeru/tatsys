# CustomPage Component Documentation

## Overview

The `CustomPage` component is a reusable page layout designed for managing data lists in a structured and customizable way. It includes a table with configurable columns, search functionality, and action menus.

This component helps developers quickly generate CRUD (Create, Read, Update, Delete) interfaces for different data entities by defining a schema.

---

## Installation

Ensure you have React and PropTypes installed in your project. If not, install them using:

```sh
npm install prop-types
```

Then, import the `CustomPage` component:

```jsx
import CustomPage from "../global/components/CustomPage";
```

---

## Usage

To use `CustomPage`, you need to define a `schema` that describes the structure of the data and pass it as a prop.

### Example Usage:

```jsx
import React from "react";
import CustomPage from "../global/components/CustomPage";
import TextSearchable from "../global/components/TextSearchable";
import NewCustomComponent from "../components/NewCustomComponent";

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
  return (
    <CustomPage
      dataListName="tests"
      schema={testSchema}
      additionalMenuOptions={[NewCustomComponent]}
    />
  );
};

export default TestPage;
```

---

## Props

### Required Props

| Prop Name      | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `dataListName` | `string` | The name of the data list being managed. |
| `schema`       | `object` | Defines the structure of the data table. |

### Optional Props

| Prop Name               | Type                   | Default | Description                            |
| ----------------------- | ---------------------- | ------- | -------------------------------------- |
| `title`                 | `string`               | `""`    | Custom title for the page.             |
| `description`           | `string`               | `""`    | Description for the page.              |
| `searchable`            | `bool`                 | `true`  | Enables search functionality.          |
| `hasEdit`               | `bool`                 | `true`  | Enables the edit option in the menu.   |
| `hasDelete`             | `bool`                 | `true`  | Enables the delete option in the menu. |
| `hasAdd`                | `bool`                 | `true`  | Enables the add option in the menu.    |
| `customAddElement`      | `element`              | `null`  | Custom element for adding new items.   |
| `customEditElement`     | `element`              | `null`  | Custom element for editing items.      |
| `additionalMenuOptions` | `arrayOf(elementType)` | `[]`    | Additional menu options as components. |
| `customBulkActions`     | `arrayOf(elementType)` | `[]`    | Additional bulk action components.     |

---

## Schema Definition

The `schema` prop is an object that defines each column in the table. Each key represents a column, and its value is an object with the following properties:

| Key            | Type       | Required | Description                                           |
| -------------- | ---------- | -------- | ----------------------------------------------------- |
| `label`        | `string`   | ✅       | Column label in the table.                            |
| `type`         | `string`   | ✅       | Column data type (`text`, `number`, `boolean`, etc.). |
| `show`         | `bool`     | ❌       | Determines if the column is displayed.                |
| `searchable`   | `bool`     | ❌       | Enables search functionality for the column.          |
| `customRender` | `function` | ❌       | Function to render custom content in the column.      |
| `default`      | `any`      | ❌       | Default value for the column.                         |

Example `schema`:

```js
const schema = {
  name: { type: "text", label: "Name", show: true, searchable: true },
  age: { type: "number", label: "Age", show: true },
  isActive: { type: "boolean", label: "Active", default: true, show: true },
  action: { type: "action", label: "Actions" },
};
```

---

## Additional Menu Options

The `additionalMenuOptions` prop allows you to pass custom menu components that receive useful props like `row`, `endpoint`, and `dataListName`.

Example:

```js
const NewCustomComponent = ({ row, endpoint, dataListName }) => {
  return <button onClick={() => console.log(row)}>Custom Action</button>;
};
```

And include it like this:

```jsx
<CustomPage additionalMenuOptions={[NewCustomComponent]} />
```

---

## Bulk Actions

The `customBulkActions` prop allows defining custom bulk actions applied to multiple selected items.

Example:

```js
const CustomBulkAction = ({ selectedRows }) => {
  return <button onClick={() => console.log(selectedRows)}>Bulk Delete</button>;
};
```

And include it like this:

```jsx
<CustomPage customBulkActions={[CustomBulkAction]} />
```

---

## Custom Render Example

If you want to customize how a column is displayed, use `customRender`:

```js
const schema = {
  status: {
    type: "text",
    label: "Status",
    show: true,
    customRender: (row) => <span>{row.status ? "Active" : "Inactive"}</span>,
  },
};
```

---

## Conclusion

The `CustomPage` component simplifies the creation of dynamic data management pages by allowing flexible schema definitions, additional menu options, bulk actions, and custom column rendering.

This makes it an excellent choice for applications that need scalable CRUD operations with minimal effort.

Happy coding! 🚀
