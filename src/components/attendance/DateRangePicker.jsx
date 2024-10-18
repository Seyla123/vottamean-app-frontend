import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Typography, InputAdornment, TextField } from '@mui/material';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs';

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
            <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 1, sm: 2 }}
                flexWrap="nowrap"
                justifyContent="center"
            >
                <DatePicker
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            type="text"
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
                <Typography className="date-separator">to</Typography>
                <DatePicker
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            type="text"
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
            </Stack>
        </LocalizationProvider>

    );
};
export default DateRangePicker;

