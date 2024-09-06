import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button, Stack, Divider, Card, Typography, Box } from "@mui/material";

function ClassPeriodCreatePage() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState(false);

  // style
  const containerButton = {
    maxWidth: {lg: "364px", sm: " 350px"},
    mt: "24px",
    width: "100%",
    display: "flex",
    gap: { lg: "24px", xs: "16px" },
  };
  const containerInput = {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "16px", lg: "24px" },
  };
  const form = { boxShadow: 1, p: {lg: "24px", xs: "16px"}, display: "flex", flexDirection: "column", gap: "24px"};
  const button = { width: "100%", height: { lg: "42px", sm: "38px" } };
  const section = { my: 0, fontSize: { lg: 32, xs: 20 } };
  const title = { fontSize: { lg: 16, xs: 14 } };
  const divider = { bgcolor: "black" };
  const timeInput = { width: "100%", mt: "4px" };
  const content = { lg: "32px", xs: "24px" };

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Box>
      {/* Title */}
      <Box sx={{ my: content }}>
        <Typography fontWeight="bold" sx={section}>
          ADD CLASS PERIOD
        </Typography>
        <Typography color="textDisabled" sx={title}>
          Please Fill Class Period Information
        </Typography>
      </Box>
      <Card sx={form}>
        <Typography sx={{ fontSize: 18 }} fontWeight="bold">
          Class Period Information
        </Typography>
        <Divider sx={divider} />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["TimePicker", "TimePicker", "TimePicker"]}
            >
              <Box sx={containerInput}>
                <Box>
                  <Typography color={!startTime && error ? "red" : "inherit"}>
                    Start time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    slotProps={{
                      textField: {
                        placeholder: "select",
                        helperText:
                          !startTime && error ? "Start time is required" : "",
                        error: !startTime && error,
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography color={!endTime && error ? "red" : "inherit"}>
                    End time
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    slotProps={{
                      textField: {
                        placeholder: "select",
                        helperText:
                          !endTime && error ? "End time is required" : "",
                        error: !endTime && error,
                        margin: "none",
                        FormHelperTextProps: {},
                      },
                    }}
                  />
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>

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
