import { Box, Typography, TextField, Button, Checkbox } from "@mui/material";
import HeaderTitle from "./HeaderTitle";
import { Link } from "react-router-dom";
const GetStartSignUp = ({ children }) => {

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle title="Get started" subTitle="Create an account" />

      {/* Form Container */}
      <Box sx={formContainerStyles}>
        {/* Email Input Container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Email</Typography>
          <TextField placeholder="email" type="email"/>
        </Box>

        {/* Password Input Container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Password</Typography>
          <TextField placeholder="password" type="password"/>
        </Box>

        {/* Confirm Password Input Container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Confirm Password</Typography>
          <TextField placeholder="confirm password" type="password"/>
        </Box>
      </Box>



      {/* Button Container */}
      <Box sx={buttonContainerStyles}>
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
        {children}
        <Typography variant="body1">
          Already have an account?
          <Link to={"/auth/login"}>
          <Typography variant="body1" component="span" color="primary">
            {" "}Login
          </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default GetStartSignUp;

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