import { Box, TextField, Typography } from "@mui/material";

const TextFieldComponent = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <Typography sx={{ fontSize: "16px" }}>{label}</Typography>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default TextFieldComponent;