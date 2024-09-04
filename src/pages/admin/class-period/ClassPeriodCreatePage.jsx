import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="Start time" components={["TimePicker"]}>
                <TimePicker sx={{width: '100%'}} label="select" />
              </DemoItem>
              <DemoItem label="Start time" components={["TimePicker"]}>
                <TimePicker sx={{width: '100%'}} label="select" />
              </DemoItem>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


export default ClassPeriodCreatePage;
