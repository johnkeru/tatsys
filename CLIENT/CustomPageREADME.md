## CustomPage Component Documentation

### Overview
The `CustomPage` component provides a customizable interface for managing data lists. It integrates search functionality, CRUD operations, and a flexible schema for defining table structures.

### Props

| Prop Name            | Type                         | Default  | Description |
|----------------------|----------------------------|----------|-------------|
| `dataListName`      | `string`                     | Required | The name of the data list to manage. |
| `schema`            | `object`                     | Required | Defines the structure of the data, including labels, types, and display rules. |
| `title`             | `string`                     | `""`     | Custom title for the page. Defaults to capitalized `dataListName`. |
| `description`       | `string`                     | `""`     | Custom description for the page. Defaults to `"Manage {dataListName}"`. |
| `searchable`        | `bool`                       | `true`   | Enables or disables the search functionality. |
| `hasEdit`           | `bool`                       | `true`   | Determines if the edit option is available. |
| `hasDelete`         | `bool`                       | `true`   | Determines if the delete option is available. |
| `hasAdd`            | `bool`                       | `true`   | Determines if the add option is available. |
| `customAddElement`  | `React.Element`              | `null`   | Custom component to be used for adding new entries. |
| `customEditElement` | `React.Element`              | `null`   | Custom component to be used for editing entries. |
| `additionalMenuOptions` | `Array of Components`  | `[]`     | Custom menu components to be rendered in the action column. |

### Schema Structure
Each key in the `schema` object defines a column with the following properties:

| Key         | Type       | Required | Description |
|------------|-----------|----------|-------------|
| `label`    | `string`   | ✅        | The label displayed for the column. |
| `type`     | `string`   | ✅        | The type of data in the column (e.g., `text`, `number`, `date`). |
| `show`     | `bool`     | ❌        | Determines if the column is visible in the table. |
| `searchable` | `bool`   | ❌        | Indicates if the column should be included in search queries. |
| `customRender` | `func` | ❌        | Function to customize the rendering of the column. |
| `default`  | `any`      | ❌        | Default value for the column. |

### Example Usage
```jsx
import CustomPage from "./CustomPage";
import NewCustomComponent from "./NewCustomComponent";

const testSchema = {
  name: { label: "Name", type: "text", show: true, searchable: true, default: "" },
  age: { label: "Age", type: "number", show: true, default: 0 },
};

const App = () => {
  return (
    <CustomPage
      dataListName="tests"
      schema={testSchema}
      additionalMenuOptions={[NewCustomComponent]}
    />
  );
};

export default App;
```

### Updates in `additionalMenuOptions`
Instead of passing an array of menu option objects, `additionalMenuOptions` now expects an array of React components. These components will be rendered inside the menu:

```jsx
{additionalMenuOptions.map((Component, index) => (
  <Component
    key={index}
    row={row}
    endpoint={endpoint}
    parentClose={handleClose}
    dataListName={dataListName}
  />
))}
```

This allows for dynamic customization of the menu with reusable components.

