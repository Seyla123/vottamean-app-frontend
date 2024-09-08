import { Box, Typography, TextField, Button, Checkbox } from "@mui/material";
import HeaderTitle from "./HeaderTitle";
import { Link } from "react-router-dom";

const LoginForm = () => {

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle title="WaveTrack Welcome!" subTitle="Log in to manage attendance efficiently and effectively." />

      {/* Form Container */}
      <Box sx={formContainerStyles}>
        {/* Email Input Container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Email</Typography>
          <TextField placeholder="email" />
        </Box>

        {/* Password Input Container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Password</Typography>
          <TextField placeholder="password" />
        </Box>
      </Box>

      {/* Checkbox */}
      <Box sx={checkboxContainerStyles}>
        <Checkbox color="default" inputProps={{ "aria-label": "primary checkbox" }} />
        <Typography variant="body2">
          By signing up, I agree with
          <Typography variant="body2" component="span" color="primary">
            {" "}terms and conditions
          </Typography>
        </Typography>
      </Box>

      {/* Button Container */}
      <Box sx={buttonContainerStyles}>
      <Button
      sx={{ padding: { xs: 1, md: 2 } }}
      variant="contained"
    >
     SIGN IN
    </Button>
        <Typography variant="body1">
        Don't you have an account?
            <Link  to="/signup">
          <Typography onClick={() => {}} sx={{ cursor: "pointer" }} variant="body1" component="span" color="primary">
              Sign Up
          </Typography>
            </Link>
        </Typography>
        </Box>
    </Box>
  );
};

export default LoginForm;

const containerStyles = {
  gap: 3,
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: { xs: 3, md: 4 },
};

const inputContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
};

const checkboxContainerStyles = {
  display: "flex",
  alignItems: "center",
};

const buttonContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  textAlign: "center",
};