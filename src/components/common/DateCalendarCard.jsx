import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import { shadow } from '../../styles/global';

const DateCalendarCard = () => {
  return (
    <Box
      sx={shadow}
      width={'100%'}
      height={'100%'}
      bgcolor={'#fff'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </Box>
  );
};

export default DateCalendarCard;
