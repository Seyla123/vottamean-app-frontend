import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import HeaderTitle from "./HeaderTitle";
import { Link } from "react-router-dom";
import WaveTrackLogo from "../../assets/images/logoWaveTrack.png"
const LoginForm = () => {

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle title="WaveTrack Welcome!" subTitle="Log in to manage attendance efficiently and effectively." center>
        {/* image container  */}
        <Box
          component={'img'}
          src={WaveTrackLogo}
          sx={{ display:{xs:'flex',md:'none'}, alignSelf: "center", maxWidth:'80px' }}
        />
      </HeaderTitle>

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


      {/* Button Container */}
      <Box sx={buttonContainerStyles}>
        {/* forgot password */}
        <Stack alignSelf={"flex-end"} >
          <Link  to="/forgot-password">
            <Typography variant="body2" component="span" color="primary">
              {" "}Forgot Password?
            </Typography>
          </Link>
        </Stack>
        <Button
          sx={{ padding: { xs: 1, md: 2 } }}
          variant="contained"
        >
          SIGN IN
        </Button>
        <Typography variant="body1">
          Don't you have an account?
          <Link style={{ textDecoration: 'none' }} to="/signup">
            <Typography variant="body1" component="span" color="primary">
              {' '}Sign Up
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


const buttonContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  textAlign: "center",
};