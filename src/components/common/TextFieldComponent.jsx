import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = forwardRef((props, ref) => {
  const {
    customStyle,
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
  } = props;

  return (
    <TextField
      ref={ref}
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      sx={customStyle}
    />
  );
});

export default TextFieldComponent;
