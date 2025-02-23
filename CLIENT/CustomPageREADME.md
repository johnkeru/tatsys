# CustomPage Component Documentation

## Overview
`CustomPage` is a reusable React component designed for dynamically generating pages with table-based data management. It integrates a dashboard header, table, menu, and create/update dialog, making it easy to manage different data entities.

## Usage
### Example Implementation
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
### Required Props
| Prop | Type | Description |
|------|------|-------------|
| `dataListName` | `string` | The name of the dataset being managed (e.g., "tests"). |
| `schema` | `object` | Defines the structure of the table columns and input fields. |

### Optional Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `""` | Custom page title. Defaults to `dataListName` capitalized. |
| `description` | `string` | `"Manage <dataListName>"` | Custom page description. |
| `searchable` | `bool` | `true` | Enables search functionality in the table. |
| `hasEdit` | `bool` | `true` | Allows editing of table rows. |
| `hasDelete` | `bool` | `true` | Enables delete functionality. |
| `hasAdd` | `bool` | `true` | Shows the add new record button. |
| `customAddElement` | `React.Element` | `null` | Custom component for adding records. |
| `customEditElement` | `React.Element` | `null` | Custom component for editing records. |
| `additionalMenuOptions` | `arrayOf(React.ElementType)` | `[]` | Additional menu options that render as components. |

## Schema Structure
Each field in the `schema` object should follow this format:
```js
{
  fieldName: {
    type: "text" | "number" | "boolean" | "textarea" | "action",
    label: "Field Label",
    required: true, // If applicable
    searchable: true | false,
    show: true | false, // Whether to display in the table
    default: any, // Default value if applicable
    customRender: (row) => <CustomComponent data={row} />, // Optional custom rendering
  }
}
```

## Custom Menu Options
To add additional actions in the table menu, pass components to `additionalMenuOptions`:
```jsx
const NewCustomComponent = ({ row, endpoint, parentClose, dataListName }) => {
  return <button onClick={() => console.log(row)}>Custom Action</button>;
};

<CustomPage additionalMenuOptions={[NewCustomComponent]} />
```

## Notes
- The `CustomPage` component automatically generates a table and dashboard UI.
- The `schema` prop controls the structure of the table.
- Custom components can be passed for additional actions.

## License
This project is open-source and free to use.

