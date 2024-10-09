import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { LockKeyholeOpen, EyeIcon, EyeOff } from 'lucide-react';

const PasswordInput = ({
  name,
  label,
  control,
  showPassword,
  togglePasswordVisibility,
  error,
  placeholder,
  icon: Icon = LockKeyholeOpen,
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
        <TextField
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
                <Icon size={20} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} size="small">
                  {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
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
