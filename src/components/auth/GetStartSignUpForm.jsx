import { Box, Typography, TextField, Button, Checkbox } from "@mui/material";
import HeaderTitle from "./HeaderTitle";
function GetStartSignUp() {
  return (
    <Box
      sx={{
        gap: 3,
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header title */}
      <HeaderTitle 
        title={"Get started"}
        subTitle={"Create an account"}
      />

      {/* form container */}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}
      >
        {/* email input container */}
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="body1">Email</Typography>
          <TextField placeholder="email" />
        </Box>

        {/* Password input container */}
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="body1">Password</Typography>
          <TextField placeholder="password" />
        </Box>

        {/* Confirm password input container */}
        <Box display={"flex"} flexDirection={"column"} gap={0.5}>
          <Typography variant="body1">Confirm Password </Typography>
          <TextField placeholder="confirm password" />
        </Box>
      </Box>

      {/* check box */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          color="default"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Typography variant="body2">
          By signing up i agree with
          <Typography variant="body2" component={"span"} color={"primary"}>
            {" "}
            terms and conditions
          </Typography>
        </Typography>
      </Box>

      {/* container button continue and already ahve an account login link */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          textAlign: "center",
        }}
      >
        <Button sx={{ padding: { xs: 1, md: 2 } }} variant="contained">
          Continue
        </Button>
        <Typography variant="body1">
          Already have an account?
          <Typography variant="body1" component={"span"} color={"primary"}>
            {" "}
            Login
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default GetStartSignUp;
