import React from 'react';
import { Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography, InputAdornment, styled } from '@mui/material';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
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
  '& .MuiInputBase-input': {
    padding: '12px 14px',
  },
  '& .MuiInputAdornment-root': {
    marginRight: 0,
  },
  // Add this specific targeting for the calendar icon
  '& .MuiIconButton-root .MuiSvgIcon-root': {
    fontSize: 18, // Adjust this value to make the icon smaller or larger
    color: '#757575', // This matches the gray color shown in your image
  },
}));

const DOBPicker = ({
  control,
  errors,
  name,
  dob,
  setDob,
  defaultValue,
  disabled = false,
}) => {
  // - Convert the defaultValue to a dayjs object if it exists
  const initialDob = dob
    ? dayjs(dob)
    : defaultValue
      ? dayjs(defaultValue)
      : null;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}
    >
      <Typography variant="body2" fontWeight="bold">
        Date Of Birth <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={initialDob}
          render={({ field }) => (
            <StyledDatePicker
              fullWidth
              disabled={disabled}
              {...field}
              value={initialDob}
              onChange={(newValue) => {
                setDob(newValue);
                field.onChange(newValue ? newValue.format('YYYY-MM-DD') : '');
              }}
              maxDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors[name],
                  helperText: errors[name] ? errors[name].message : '',
                  placeholder: 'YYYY-MM-DD',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calendar size={18} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DOBPicker;
