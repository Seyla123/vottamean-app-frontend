import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button, Stack, Divider, Card, Typography, Box } from "@mui/material";

function ClassPeriodCreatePage() {
  // States for time values and validation errors
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState(false);

  // style
  const containerButton = { mt: { lg: 4, xs: 2 }, maxWidth: "334px", width: "100%", display: "flex", gap: 4 };
  const containerInput = { display: "flex", flexDirection: "column", gap: { xs: 1, lg: 3 } };
  const form = { boxShadow: 2, Shadow: 1, padding: { lg: 4, xs: 4 } };
  const button = { width: "100%", height: { xs: 38, lg: 42 } };
  const section = { my: 0, fontSize: { lg: 32, xs: 20 } };
  const title = { fontSize: { lg: 16, xs: 14 } };
  const divider = { bgcolor: "black", my: 2 };
  const timeInput = { width: "100%", my: 1 };
  const margin = { lg: 4, xs: 2 };

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      setError(true);
    } else {
      setError(false);
      // Proceed with form submission logic here
      console.log("Form submitted with:", { startTime, endTime });
    }
  };

  return (
    <Box sx={{ mx: margin }}>
      {/* Title */}
      <Box sx={{ my: margin }}>
        <Typography fontWeight="bold" sx={section}>
          ADD CLASS PERIOD
        </Typography>
        <Typography color="textDisabled" sx={title}>
          Please Fill Class Period Information
        </Typography>
      </Box>
      {/* Form */}
      <Card sx={form}>
        {/* title field */}
        <Typography sx={{ fontSize: 18 }} fontWeight="bold">
          Class Period Information
        </Typography>
        <Divider sx={divider} />
        {/* content field */}
        <Box>
          {/* time field */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker", "TimePicker"]}>
              <Box sx={containerInput}>
                <Box>
                  <Typography color={!startTime && error ? 'red' : 'inherit'}>
                    Start time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    placeholder="select"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    slotProps={{
                      textField: {
                        helperText: !startTime && error ? 'Start time is required' : '',
                        error: !startTime && error,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography color={!endTime && error ? 'red' : 'inherit'}>
                    End time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    placeholder="select"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    slotProps={{
                      textField: {
                        helperText: !endTime && error ? 'End time is required' : '',
                        error: !endTime && error,
                      },
                    }}
                  />
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>

          {/* button field */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack direction="row" sx={containerButton}>
              <Button sx={button} variant="outlined" color="black">
                cancel
              </Button>
              <Button sx={button} variant="contained" onClick={handleSubmit}>
                add period
              </Button>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ClassPeriodCreatePage;
