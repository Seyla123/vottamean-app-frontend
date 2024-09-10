import React from "react";
import { Box, Typography, TextField, Button, Link, Card} from "@mui/material";
import forget from "../../assets/icon/forget.png";
import GoBackButton from "../../components/common/GoBackButton";
import { Padding } from "@mui/icons-material";
function PasswordForgotPage() {
  
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* back button and img  */}
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img src={forget} style={{ width: "100%" }}></img>
          </Box>
        </Box>
        {/* Reset Password Title  */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ transitionDuration: "0.5s",fontSize: { xs: "24px", md: "36px" }, fontWeight: "bold" }}
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
            />
          </Box>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
          <Button fullWidth  variant="contained" sx={{padding:{xs:1.5,md:2}}}>
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


const screen = {
    width: "100%",
    height: "100vh",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    mx: "auto",
    bgcolor: "#F9FAFB",
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
