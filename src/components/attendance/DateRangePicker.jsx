import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Typography, InputAdornment, TextField } from '@mui/material';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { StyledDatePicker } from '../common/DOBPicker';
import { StyledTextField } from '../common/InputField';

const DateRangePicker = ({ onStartDateChange, onEndDateChange }) => {
  // - startDate: the start date of the date range
  // - endDate: the end date of the date range
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    onStartDateChange(newValue ? newValue.format('YYYY-MM-DD') : '');
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    onEndDateChange(newValue ? newValue.format('YYYY-MM-DD') : '');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" alignItems="center" width={'100%'} gap={2}>
        <StyledDatePicker
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <StyledTextField {...params} type="text" />}
        />
        <Typography className="date-separator">to</Typography>
        <StyledDatePicker
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <StyledTextField {...params} type="text" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};
export default DateRangePicker;
