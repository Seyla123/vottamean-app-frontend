import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import GroupIcon from '@mui/icons-material/Group';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const GenderSelect = ({ control, errors, name, label }) => {
  const getIcon = (selectedGender) => {
    switch (selectedGender) {
      case 'Male':
        return <MaleIcon />;
      case 'Female':
        return <FemaleIcon />;
      case 'Other':
        return <TransgenderIcon />;
      default:
        return <GroupIcon />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            fullWidth
            select
            {...field}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            placeholder="Select your gender"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getIcon(field.value)}
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        )}
      />
    </Box>
  );
};

export default GenderSelect;
