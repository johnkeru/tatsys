import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { TextField, Autocomplete, Chip } from "@mui/material";

const CustomAutoCompleteChips = ({
  fieldName,
  control,
  onInputChange,
  getOptionLabel = "label",
  onChange = undefined,
  sx = { bgcolor: "#ffffff", m: 0 },
  size = "small",
  variant = "outlined",
  required = false,
  freeSolo = true, // Enables user input
  apiList = { api: null, endpoint: "", listName: "" },
  disabled = false,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
    rules: required ? { required: "This field is required" } : undefined,
  });

  const [options, setOptions] = useState([]); // Default options
  const [_selectedOptions, setSelectedOptions] = useState([]);
  // Fetch options from API if available
  useEffect(() => {
    if (!apiList.api || !apiList.endpoint) return;
    apiList.api
      .get(apiList.endpoint)
      .then((res) => setOptions(res.data[apiList.listName] || [])) // Ensure fallback
      .catch(console.log);
  }, [apiList.api, apiList.endpoint]); // Include dependencies

  return (
    <Autocomplete
      multiple
      disabled={disabled}
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option[getOptionLabel] || ""
      }
      value={field.value || []} // Ensure array for multiple selections
      onChange={(_, value) => {
        setSelectedOptions((prev) => {
          if (prev.length !== value.length) {
            const getRemoveOption = prev.filter(
              (each) => !value.some((newVal) => newVal._id === each._id)
            );

            setOptions((prevOptions) => [...prevOptions, ...getRemoveOption]);

            return value; // Directly return updated selected options
          }
          return prev;
        });

        const existingIDS = new Set(value.map((selected) => selected._id));

        setOptions((prev) => prev.filter((opt) => !existingIDS.has(opt._id)));

        field.onChange(value); // Updates react-hook-form state
        onChange && onChange(value);
      }}
      onInputChange={(_, value) => {
        onInputChange && onInputChange(value);
      }}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            color="info"
            key={index}
            label={option[getOptionLabel]}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          error={!!error}
          helperText={error ? error.message : ""}
          variant={variant}
          margin="normal"
          size={size}
          sx={sx}
          {...rest}
        />
      )}
    />
  );
};

export default CustomAutoCompleteChips;
