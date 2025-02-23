import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomAutoComplete = ({
  fieldName,
  control,
  onInputChange,
  dataOption = [],
  getOptionLabel = "",
  onChange = undefined,
  sx = { bgcolor: "#ffffff", m: 0 },
  size = "small",
  variant = "outlined",
  required = false,
  freeSolo = false,
  getObject = false,
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

  return (
    <Autocomplete
      freeSolo={freeSolo}
      {...field}
      options={dataOption}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option[getOptionLabel] || ""
      }
      getOptionKey={(option) =>
        typeof option === "string" ? option : option._id
      }
      value={field.value || null} // Ensure initial value is null or a valid object
      onChange={(_, value) => {
        // console.log(value);
        field.onChange(getObject ? value : value[getOptionLabel]); // for use form change
        onChange && onChange(value); // for dev use
      }}
      onInputChange={(_, value) => {
        // console.log(value);
        field.onChange(getObject ? value : value[getOptionLabel]); // for use form change
        onInputChange && onInputChange(value); // for dev use
      }}
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

export default CustomAutoComplete;
