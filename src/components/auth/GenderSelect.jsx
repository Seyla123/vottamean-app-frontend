// GenderSelect.js
import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, MenuItem, Box, Typography } from '@mui/material';

const GenderSelect = ({ control, errors, name }) => {
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
        Gender <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <Box sx={{ color: '#B5B5B5' }}>Gender</Box>;
              }
              return selected;
            }}
            helperText={errors[name]?.message}
            error={!!errors[name]}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        )}
      />
    </Box>
  );
};

export default GenderSelect;
