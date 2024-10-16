import React from 'react';
import { TextField, Typography, InputAdornment, Box } from '@mui/material';
import { Controller } from 'react-hook-form';

const InputField = ({
  name,
  control,
  label,
  placeholder,
  errors,
  icon: Icon,
  type = 'text',
  multiline = false,
  minRows,
  required = true,
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {label}{' '}
        {required && <span style={{ color: 'red', marginLeft: 1 }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            fullWidth
            type={type}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            InputProps={{
              startAdornment: Icon ? (
                <InputAdornment position="start">
                  <Icon size={20} />
                </InputAdornment>
              ) : null,
            }}
            disabled={disabled}
            multiline={multiline}
            minRows={minRows}
          />
        )}
      />
    </Box>
  );
};

export default InputField;
