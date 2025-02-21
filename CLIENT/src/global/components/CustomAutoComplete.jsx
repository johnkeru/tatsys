import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomAutoComplete = ({
  fieldName = "",
  control,
  errors,
  dataOption,
  onInputChange,
  sx = { bgcolor: "#ffffff", m: 0 },
  size = "small",
  variant = "outlined",
  ...rest
}) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={dataOption || []}
          getOptionLabel={(option) => option || ""}
          value={field.value || null} // Ensure initial value is set to null or a valid object
          onChange={(_, value) => field.onChange(value)}
          onInputChange={onInputChange && onInputChange}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              error={!!errors[fieldName]}
              helperText={errors[fieldName] ? errors[fieldName].message : ""}
              variant={variant}
              margin="normal"
              size={size}
              sx={sx}
              {...rest}
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
