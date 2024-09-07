import { Box, Typography, TextField, Checkbox } from "@mui/material";
import HeaderTitle from "./HeaderTitle";

const GetStartSignUp = ({ children }) => {

  return (
    <Box sx={containerStyles}>
      {/* header title */}
      <HeaderTitle title={"Get started"} subTitle={"Create an account"} />

      {/* form container */}
      <Box sx={formContainerStyles}>
        {/* email input container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Email</Typography>
          <TextField placeholder="email" />
        </Box>

        {/* Password input container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Password</Typography>
          <TextField placeholder="password" />
        </Box>

        {/* Confirm password input container */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Confirm Password </Typography>
          <TextField placeholder="confirm password" />
        </Box>
      </Box>

      {/* check box */}
      <Box sx={checkboxContainerStyles}>
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
      <Box sx={buttonContainerStyles}>
        {children}
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
};

export default GetStartSignUp;

const containerStyles = {
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