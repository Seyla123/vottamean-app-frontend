import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SimpleForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [dob, setDob] = useState(null);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Date of Birth Field */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography>Date of Birth</Typography>
          <Controller
            name="dob"
            control={control}
            rules={{
              required: 'Date of birth is required',
              validate: (value) => {
                if (!value) {
                  return 'Date of birth is required';
                }
                if (dayjs(value).isAfter(dayjs())) {
                  return 'Date of birth cannot be in the future';
                }
                return true;
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                  field.onChange(newValue);
                }}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error ? error.message : '',
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </Box>
        {/* Submit Button */}
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </LocalizationProvider>
  );
};

export default SimpleForm;
