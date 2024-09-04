import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

function ClassPeriodCreatePage() {
  return (
    <Box sx={{mx: {lg: 4, xs: 2}}}>
      {/* Title */}
      <Box sx={{my:{lg: 4, xs: 2}}}>
        <Typography  fontWeight="bold" sx={{ my: 0, fontSize: {lg: 32, xs: 20}}} gutterBottom>
          ADD CLASS PERIOD
        </Typography>
        <Typography color="textDisabled" sx={{ fontSize: {lg: 16, xs:14}}}>
          Please Fill Class Period Information
        </Typography>
      </Box>
      {/* Form */}
      <Card sx={{ boxShadow: 2, Shadow: 1, padding: {lg: 4, xs: 4}}}>
        {/* title field */}
        <Typography gutterBottom variant="subtitle1" fontWeight="bold">
          Class Period Information
        </Typography>
        <Divider sx={{ bgcolor: "black", my: 2 }}></Divider>
        {/* content field */}
        <Box>
          {/* time field */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["TimePicker", "TimePicker", "TimePicker"]}
            >
              <DemoItem label="Start time">
                <TimePicker sx={{ width: "100%" }} label="select" />
              </DemoItem>
              <DemoItem label="End time">
                <TimePicker sx={{ width: "100%" }} label="select" />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          {/* button field */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <Stack
              spacing={3}
              direction="row"
              sx={{ mt: 4, width: "318px" }}>
              <Button variant="outlined" size="medium" sx={{ width: "100%", height: {sm: 38, lg: 42} }} color="black">
                cancel
              </Button>
              <Button variant="contained" size="medium" sx={{ width: "100%", height: {sm: 38, lg: 42} }}>
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
