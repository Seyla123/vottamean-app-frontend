import React from "react";
import { Box, Typography, TextField, Button, Link, Card } from "@mui/material";
import verify from "../../assets/icon/verify.png";

function AccountSuccessPage() {
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* Image and tittle   */}
        <Box sx={head}>
          <Box sx={img}>
            <img src={verify} style={{ width: "100%" }}></img>
          </Box>

          {/* Verify Account Title  */}
            <Typography
              sx={{
                transitionDuration: "0.5s",
                fontSize: { xs: "24px", md: "36px" },
                fontWeight: "bold",
                textAlign : "center"
              }}
            >
              Verify Successfully 
            </Typography>

        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ padding: { xs: 1, md: 2} }}
        >
          GO TO LOGIN
        </Button>
      </Card>
    </Box>
  );
}

export default AccountSuccessPage;

const screen = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#F9FAFB",
};

const content = {
  bgcolor: "#FFFFFF",
  maxWidth: "550px",
  width: "100%",
  maxHeight: "384px",
  borderRadius: "16px",
  py: "32px",
  px: {
    xs: "24px",
    md: "32px",
  },
  display: "flex",
  flexDirection: "column",
  gap: {
    xs : "24px", 
    md : "32px"
  },
};

const head = {
    display : "flex",
    flexDirection : "column",
    gap : {
        xs : "0px",
        md : "12px"
    }
}

const img = {
  mx: "auto",
  width: {
    xs: "140px",
    md: "160px",
  },
};