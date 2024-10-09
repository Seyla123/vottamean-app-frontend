import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';

const PhoneInputField = ({ name, control, label, errors }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body2" fontWeight="bold">
        {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiTelInput
            defaultCountry="KH"
            value={field.value}
            onChange={(phone) => {
              field.onChange(phone);
            }}
            helperText={errors[name]?.message}
            error={!!errors[name]}
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default PhoneInputField;
