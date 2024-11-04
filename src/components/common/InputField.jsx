import React from 'react';
import { TextField, Typography, InputAdornment, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#424242',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#b0b0b0' : '#616161',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: 0,
  },
}));

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
      <Typography variant="body2" fontWeight="bold" color="text.primary">
        {label}
        {required && (
          <Typography component="span" color="error.main" marginLeft={0.5}>
            *
          </Typography>
        )}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyledTextField
            {...field}
            variant="outlined"
            fullWidth
            type={type}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            InputProps={{
              startAdornment: Icon ? (
                <InputAdornment position="start" sx={{ pr: 2 }}>
                  <Icon size={18} color={disabled ? '#9e9e9e' : '#616161'} />
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
