import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  useTheme,
  styled,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import GroupIcon from '@mui/icons-material/Group';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

export const StyledTextField = styled(TextField)(({ theme }) => ({
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

const GenderSelect = ({
  control,
  errors,
  name,
  label,
  defaultValue,
  disabled = false,
}) => {
  const theme = useTheme();

  // - Get the current selected icon to display
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
    <Stack direction="column" spacing={1}>
      <Typography variant="body2" fontWeight="bold">
        {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <StyledTextField
            select
            fullWidth
            {...field}
            value={field.value || ''}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            disabled={disabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getIcon(field.value)}
                </InputAdornment>
              ),
            }}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => {
                if (!selected) {
                  return (
                    <span style={{ color: theme.palette.grey[400] }}>
                      Gender
                    </span>
                  );
                }
                return selected;
              },
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </StyledTextField>
        )}
      />
    </Stack>
  );
};

export default GenderSelect;
