import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function ClassPeriodCreatePage() {
  return (
    <Box>
    {/* Title */}
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 0 }} gutterBottom>
          ADD CLASS PERIOD
        </Typography>
        <Typography variant="subtitle1" color="textDisabled">
          Please Fill Class Period Information
        </Typography>
      </Box>
    {/* Form */}
      <Box>
        <Box>
        <Typography gutterBottom variant="body1" fontWeight="bold">
            Class Period Information
        </Typography>
        <Box>
        <TimePicker label="Basic time picker" />
        </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default ClassPeriodCreatePage;
