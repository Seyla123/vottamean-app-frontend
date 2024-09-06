import React from "react";
import { Box, Typography, TextField, Button, Card } from "@mui/material";
import GoBackButton from "../../components/common/GoBackButton";
import reset from "../../assets/icon/reset.png";

function PasswordResetPage() {
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
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* back button and img  */}
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img src={reset} style={{ width: "100%" }}></img>
          </Box>
        </Box>
        {/* Reset Password Title  */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: "24px", md: "36px" }, fontWeight: "bold" }}
          >
            Reset Your Password
          </Typography>
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            Set a new password here!
          </Typography>
        </Box>
        {/* Text input */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>New Password</Typography>
            <TextField
              id="newPassword"
              placeholder="new password"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="oldPassword"
              placeholder="confirm password"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ width: "100%", height: { sx: "42px", md: "56px" } }}
        >
          Reset Password
        </Button>
      </Card>
    </Box>
  );
}

export default PasswordResetPage;