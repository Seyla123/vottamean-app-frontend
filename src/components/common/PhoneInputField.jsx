import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';

const StyledMuiTelInput = styled(MuiTelInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
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
  '& .MuiInputBase-input': {
    padding: '12px 14px',
  },
  '& .MuiInputAdornment-root': {
    marginRight: 0,
  },
}));
const PhoneInputField = ({
  name,
  control,
  label,
  errors,
  disabled = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyledMuiTelInput
            defaultCountry="KH"
            value={field.value}
            onChange={(phone) => {
              field.onChange(phone);
            }}
            helperText={errors[name]?.message}
            error={!!errors[name]}
            fullWidth
            disabled={disabled}
          />
        )}
      />
    </Box>
  );
};

export default PhoneInputField;
