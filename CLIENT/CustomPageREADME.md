# CustomPage Component

## Overview

The `CustomPage` component is a reusable React component designed to create dynamic CRUD pages with customizable table columns, search functionality, and action menus. This component streamlines the process of managing lists of data by providing an easy-to-configure structure that includes a table, a search bar, and a customizable action menu.

## Features

- Automatically generates a CRUD table based on the provided schema.
- Supports search functionality.
- Includes add, edit, and delete actions.
- Allows custom rendering of table fields.
- Enables additional menu options in the action column.

## Installation

Ensure you have React and PropTypes installed in your project:

```sh
npm install prop-types
```

## Usage

To use `CustomPage`, import it into your component and define a schema that describes the data structure.

### Example Usage

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

| Prop Name               | Type            | Required | Default | Description                                                                        |
| ----------------------- | --------------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `dataListName`          | `string`        | ✅       | -       | The name of the data list being managed.                                           |
| `schema`                | `object`        | ✅       | -       | Defines the structure of the table, including field types, labels, and visibility. |
| `title`                 | `string`        | ❌       | `""`    | The title of the page. Defaults to the capitalized `dataListName`.                 |
| `description`           | `string`        | ❌       | `""`    | Description of the page. Defaults to `"Manage {dataListName}"`.                    |
| `searchable`            | `boolean`       | ❌       | `true`  | Enables or disables search functionality.                                          |
| `hasEdit`               | `boolean`       | ❌       | `true`  | Determines if edit functionality is available.                                     |
| `hasDelete`             | `boolean`       | ❌       | `true`  | Determines if delete functionality is available.                                   |
| `hasAdd`                | `boolean`       | ❌       | `true`  | Determines if add functionality is available.                                      |
| `customAddElement`      | `React.Element` | ❌       | `null`  | Custom element for the add action.                                                 |
| `customEditElement`     | `React.Element` | ❌       | `null`  | Custom element for the edit action.                                                |
| `additionalMenuOptions` | `array`         | ❌       | `[]`    | Additional action menu options.                                                    |

## Understanding `action` Type

The `action` type is a special field type used to define actions available in the table. It ensures that each row includes a menu with options such as edit and delete. You can extend it with additional menu options using `additionalMenuOptions`.

### Example of `action` type usage

```jsx
const testSchema = {
  title: { type: "text", label: "Title", required: true, show: true },
  description: { type: "textarea", label: "Description", show: true },
  action: { type: "action", label: "Actions" },
};
```

## Understanding `additionalMenuOptions`

The `additionalMenuOptions` prop allows developers to pass extra menu options into the action column. This can be useful for adding custom actions beyond edit and delete.

### Example of `additionalMenuOptions` Usage

```jsx
const additionalOptions = [
  (row) => <button onClick={() => alert(`Viewing ${row.title}`)}>View</button>,
];

<CustomPage
  dataListName="tests"
  schema={testSchema}
  additionalMenuOptions={additionalOptions}
/>;
```

## Conclusion

The `CustomPage` component simplifies CRUD operations by dynamically generating tables with customizable fields, actions, and additional menu options. By leveraging this component, developers can quickly build pages that align with their data management needs while maintaining flexibility and reusability.
