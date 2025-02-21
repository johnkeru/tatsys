import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

const CustomTextField = ({
  control,
  fieldName,
  label = "",
  sx = { bgcolor: "#ffffff", m: 0 },
  size = "small",
  variant = "outlined",
  required = false,
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
    <TextField
      {...field}
      label={label}
      value={field.value || ""}
      fullWidth
      size={size}
      variant={variant}
      required={required}
      error={!!error}
      helperText={error ? error.message : ""}
      sx={sx}
      focused={!!field.value} // Focus only when there is a value
      {...rest}
    />
  );
};

export default CustomTextField;
