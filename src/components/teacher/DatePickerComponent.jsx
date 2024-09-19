// // import * as React from 'react';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { TextField, Box } from '@mui/material';
// // import dayjs from 'dayjs'; // Make sure dayjs is installed
// // import { DesktopDatePicker } from '@mui/x-date-pickers';

// // export default function DatePickerComponent() {
// //   const [selectedDate, setSelectedDate] = React.useState(dayjs());

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <DesktopDatePicker
// //         inputFormat="MM/DD/YYYY"
// //         value={selectedDate.getFull}
// //         onChange={(date) => setSelectedDate((prev) => ({ ...prev, dob: date }))}
// //         renderInput={(params) => <TextFieldComponent {...params} />}
// //       />
// //     </LocalizationProvider>
// //   );
// // }
// // import * as React from 'react';
// // import { Controller } from 'react-hook-form';
// // import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// // import { TextField } from '@mui/material';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import dayjs from 'dayjs';

// // DatePickerComponent with react-hook-form integration
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function DatePickerComponent({ control, name, error }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs()}
        render={({ field }) => (
          <DesktopDatePicker
            {...field}
            inputFormat="MM/DD/YYYY"
            onChange={(date) => field.onChange(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error ? error.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}

// import React from 'react';
// import { Controller } from 'react-hook-form';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers';

// const DatePickerComponent = ({ name, control }) => {
//   return (
//     <LocalizationProvider>
//       <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <DatePicker
//           {...field}
//           onChange={(date) => field.onChange(date)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       )}
//     />
//     </LocalizationProvider>
//   );
// };

// export default DatePickerComponent;
