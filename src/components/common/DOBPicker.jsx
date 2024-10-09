import React from 'react';
import { Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography, InputAdornment } from '@mui/material';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';

const DOBPicker = ({ control, errors, name, dob, setDob }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}
    >
      <Typography variant="body2" fontWeight="bold">
        Date Of Birth <span style={{ color: 'red', marginLeft: 1 }}>*</span>
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                  field.onChange(
                    newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                  );
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors[name],
                    placeholder: 'YYYY-MM-DD',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default DOBPicker;
