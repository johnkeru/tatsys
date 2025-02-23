# CustomPage Component Documentation

## Overview

The `CustomPage` component is a reusable, dynamic page that allows developers to create CRUD (Create, Read, Update, Delete) interfaces effortlessly. It provides a structured table with customizable columns, search functionality, and an action menu for each row.

## Props

The component accepts the following props:

### Required Props

| Prop Name      | Type     | Description                                                                                                   |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `dataListName` | `string` | The name of the dataset being managed. Used to generate API paths and display labels.                         |
| `schema`       | `object` | Defines the structure of the data, including labels, field types, visibility, and custom rendering functions. |

### Optional Props

| Prop Name               | Type            | Default | Description                                                                                                                                               |
| ----------------------- | --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                 | `string`        | `""`    | The title displayed on the page header. If not provided, it defaults to the `dataListName` formatted as a title.                                          |
| `description`           | `string`        | `""`    | The description shown below the title. Defaults to `"Manage {dataListName}"`.                                                                             |
| `searchable`            | `boolean`       | `true`  | Enables or disables the search functionality in the header.                                                                                               |
| `hasEdit`               | `boolean`       | `true`  | Determines whether the edit action is available in the action menu.                                                                                       |
| `hasDelete`             | `boolean`       | `true`  | Determines whether the delete action is available in the action menu.                                                                                     |
| `hasAdd`                | `boolean`       | `true`  | Enables or disables the add button in the header.                                                                                                         |
| `customAddElement`      | `React.Element` | `null`  | Custom React element to replace the default add button.                                                                                                   |
| `customEditElement`     | `React.Element` | `null`  | Custom React element to replace the default edit form.                                                                                                    |
| `additionalMenuOptions` | `Array`         | `[]`    | Custom menu options for additional actions. These components automatically receive the following props: `row`, `endpoint`, `parentClose`, `dataListName`. |

## Schema Structure

The `schema` prop is an object where each key represents a field in the dataset. Each field should have the following properties:

| Property       | Type       | Description                                                           |
| -------------- | ---------- | --------------------------------------------------------------------- |
| `label`        | `string`   | The display name for the column.                                      |
| `type`         | `string`   | Defines the type of field (e.g., `text`, `number`, `date`, `action`). |
| `show`         | `boolean`  | Determines whether the column should be visible in the table.         |
| `searchable`   | `boolean`  | Specifies if the column should be included in search queries.         |
| `customRender` | `function` | (Optional) Custom rendering function for the field.                   |
| `default`      | `any`      | (Optional) Default value for the field.                               |

## How It Works

1. The `DashboardHeader` displays the title, description, and an optional add button.
2. The `CustomTable` component fetches data from the API and renders the table based on the `schema`.
3. If an `action` field is defined in the schema, it renders the `CustomMenu` for each row.
4. The menu allows editing and deleting records if enabled.

## Example Usage

### Basic Example

```jsx
const userSchema = {
  name: { label: "Name", type: "text", show: true, searchable: true },
  email: { label: "Email", type: "text", show: true, searchable: true },
  role: { label: "Role", type: "text", show: true },
  action: { type: "action", show: true },
};

<CustomPage
  dataListName="users"
  schema={userSchema}
  title="User Management"
  description="Manage system users"
  hasAdd={true}
  hasEdit={true}
  hasDelete={true}
  additionalMenuOptions={[CustomActionComponent]}
/>;
```

### Advanced Example with Custom Rendering

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

## Notes

- Ensure that `schema` correctly defines each column to prevent UI errors.
- Custom render functions allow flexible content inside table cells.
- The `additionalMenuOptions` prop enables extending the action menu with extra features.

## Conclusion

The `CustomPage` component is designed to be a flexible and scalable solution for managing data-driven pages with minimal setup. Developers can easily customize it to fit different use cases.
