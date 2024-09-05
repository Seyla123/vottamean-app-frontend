import { DemoItem, DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button, Stack, Divider, Card, Typography, Box } from "@mui/material";

function ClassPeriodCreatePage() {
  // style
  const button = { width: "100%", height: { sm: 38, lg: 42 } };
  const form = { boxShadow: 2, Shadow: 1, padding: { lg: 4, xs: 4 } };
  const margin = { lg: 4, xs: 2 };

  return (
    <Box sx={{ mx: margin }}>
      {/* Title */}
      <Box sx={{ my: margin }}>
        <Typography
          fontWeight="bold"
          sx={{ my: 0, fontSize: { lg: 32, xs: 20 } }}
        >
          ADD CLASS PERIOD
        </Typography>
        <Typography color="textDisabled" sx={{ fontSize: { lg: 16, xs: 14 } }}>
          Please Fill Class Period Information
        </Typography>
      </Box>
      {/* Form */}
      <Card sx={form}>
        {/* title field */}
        <Typography sx={{ fontSize: 18 }} fontWeight="bold">
          Class Period Information
        </Typography>
        <Divider sx={{ bgcolor: "black", my: 2 }} />
        {/* content field */}
        <Box>
          {/* time field */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["TimePicker", "TimePicker", "TimePicker"]}
            >
              <Box sx={{display: "flex", flexDirection: "column", gap: {xs: 1, lg: 3}}}>
                <Box>
                  <Typography>End time</Typography>
                  <TimePicker sx={{ width: "100%", my: 1 }} label="select" />
                </Box>
                <Box>
                  <Typography>End time</Typography>
                  <TimePicker sx={{ width: "100%", my: 1 }} label="select" />
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>

          {/* button field */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack spacing={3} direction="row" sx={{ mt: 4, width: "318px" }}>
              <Button
                variant="outlined"
                size="medium"
                sx={button}
                color="black"
              >
                cancel
              </Button>
              <Button variant="contained" size="medium" sx={button}>
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
