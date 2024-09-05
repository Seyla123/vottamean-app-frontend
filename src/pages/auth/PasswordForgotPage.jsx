import React from "react";
import { Box, Typography, TextField, Button, Link, Card} from "@mui/material";
import BackButton from "../../../components/common/BackButton";
import forget from "../../../assets/image/forget.png";
function PasswordForgotPage() {
  const screen = {
    width: "100%",
    height: "100vh",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    mx: "auto",
    bgcolor: "#F9FAFB",
    px: "32px",
  };

  const content = {
    bgcolor : "#FFFFFF",
    maxWidth: "550px",
    width : "100%",
    maxHeight: "602px",
    mx: "auto",
    my: "auto",
    borderRadius: "16px",
    py: "32px",
    px: {
      xs: "24px",
      md: "32px",
    },
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const textInputContainer = {
    display: "flex",
    flexDirection: "column",
    gap: {
      xs: "24px",
      md: "32px",
    },
    width: "100%",
  };

  const textfield = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  };

  const img = {
    mx: "auto",
    width: {
      xs: "90px",
      md: "100px",
    },
  };

  const resetTitle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  };

  const button = {
    width: "100%",
    height: { sx: "42px", md: "56px" },
    mb: { md: "24px", xs: "12px" },
  };
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* back button and img  */}
        <Box>
          <BackButton />
          <Box sx={img}>
            <img src={forget} style={{ width: "100%" }}></img>
          </Box>
        </Box>
        {/* Reset Password Title  */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: "24px", md: "36px" }, fontWeight: "bold" }}
          >
            Forgot Password ?
          </Typography>
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            We will send you an email to reset your password
          </Typography>
        </Box>
        {/* Text input */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>Email</Typography>
            <TextField
              id="email"
              placeholder="email"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>

        <Box>
          <Button variant="contained" sx={button}>
            Continue
          </Button>

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">
              Don't have an account ?{" "}
            </Typography>
            <Link src={{}}>Sign up</Link>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default PasswordForgotPage;
