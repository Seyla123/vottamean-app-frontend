import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function DatePickerComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%', minWidth: '200px' }}>
        <DatePicker
          label="date"
          sx={{ width: '100%', minWidth: '200px' ,
            '& .MuiInputLabel-root': {
              color: '#a7a7a7'
            },
          }}
       />
      </Box>
    </LocalizationProvider>
  );
}
