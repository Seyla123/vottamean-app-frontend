import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  styled,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { LockKeyhole, EyeIcon, EyeOff } from 'lucide-react';

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const PasswordInput = ({
  name,
  label,
  control,
  showPassword,
  togglePasswordVisibility,
  error,
  placeholder,
  icon: Icon = LockKeyhole,
  showError = true,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="body2" fontWeight="bold">
      {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
    </Typography>

    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledTextField
          {...field}
          id={name}
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          error={!!error}
          helperText={showError && error ? error.message : ''}
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon size={18} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} size="small">
                  {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  </Box>
);

export default PasswordInput;
