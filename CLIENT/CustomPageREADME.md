# CustomPage Component

## Overview
The `CustomPage` component provides a reusable, configurable page layout for managing data lists in a dashboard-like environment. It includes a header, a table with customizable columns, and additional menu options for actions such as editing and deleting items.

## Usage
### Example
```jsx
import React from "react";
import CustomPage from "../global/components/CustomPage";
import TextSearchable from "../global/components/TextSearchable";
import NewCustomComponent from "../global/components/NewCustomComponent";

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

## Props
| Prop Name            | Type                                    | Required | Default | Description |
|----------------------|---------------------------------------|----------|---------|-------------|
| `dataListName`       | `string`                               | ✅ Yes    | -       | The name of the data list to manage. |
| `schema`            | `objectOf(shape({}))`                  | ✅ Yes    | -       | Defines the table structure and input fields. |
| `title`             | `string`                               | No       | `""`    | The title of the page. Defaults to `dataListName`. |
| `description`       | `string`                               | No       | `"Manage {dataListName}"` | The page description. |
| `searchable`        | `bool`                                 | No       | `true`  | Enables search functionality. |
| `hasEdit`           | `bool`                                 | No       | `true`  | Allows editing records. |
| `hasDelete`         | `bool`                                 | No       | `true`  | Allows deleting records. |
| `hasAdd`            | `bool`                                 | No       | `true`  | Enables the add new record button. |
| `customAddElement`  | `React.Element`                        | No       | `null`  | Custom component for the add button. |
| `customEditElement` | `React.Element`                        | No       | `null`  | Custom component for the edit button. |
| `additionalMenuOptions` | `arrayOf(React.ComponentType)` | No       | `[]`    | Custom menu options, passed as React components. |

## How It Works
- The `DashboardHeader` component displays the page title and description.
- The `CustomTable` renders a table based on the `schema`, including actions like edit and delete.
- The `CustomMenu` inside `CustomTable` handles additional menu options and custom rendering.
- The `additionalMenuOptions` prop allows passing React components that receive `row`, `endpoint`, `parentClose`, and `dataListName` as props.

### Example of a Custom Menu Component
```jsx
const NewCustomComponent = ({ row, endpoint, parentClose, dataListName }) => {
  return <button onClick={() => console.log(row)}>Custom Action</button>;
};
```

## Custom Render Function
The `schema` supports a `customRender` function for any field.
```jsx
likes: {
  type: "number",
  label: "Likes",
  default: 0,
  searchable: false,
  customRender: (row) => <TextSearchable columnName={row.likes} />,
  show: true,
},
```

## Conclusion
The `CustomPage` component simplifies the creation of dashboard pages by dynamically rendering forms, tables, and actions. It supports extensive customization, making it adaptable for various use cases.

