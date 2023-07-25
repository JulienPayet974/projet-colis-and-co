import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";

export function ResponsiveTextField({
  autoComplete,
  type,
  label,
  name,
  props,
  error,
  onChange,
  helperText = "",
  placeholder,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TextField
      required
      type={type}
      size={matches ? "small" : "normal"}
      name={name}
      label={label}
      onChange={onChange}
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      {...props}
      placeholder={placeholder}
    />
  );
}
