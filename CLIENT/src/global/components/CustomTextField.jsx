import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

const CustomTextField = ({
  control,
  fieldName,
  label = "",
  sx = { bgcolor: "#ffffff", mb: 0 },
  size = "small",
  variant = "outlined",
  required = false,
  type = "text",
  disabled,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
    rules: required
      ? {
          required: label + ` is required`,
          ...(type === "email"
            ? { pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } }
            : {}),
          ...(type === "number"
            ? { min: { value: 1, message: label + ` is required` } }
            : {}),
        }
      : undefined,
  });

  return (
    <TextField
      {...field}
      label={label + (required ? " *" : "")}
      value={field.value || ""}
      fullWidth
      size={size}
      type={type}
      variant={variant}
      disabled={disabled}
      error={!!error}
      helperText={error ? error.message : ""}
      sx={sx}
      InputLabelProps={{
        shrink: type === "date" || undefined,
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
