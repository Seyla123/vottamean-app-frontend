import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import Header from "../../../components/teacher/Header";
import SubHeader from "../../../components/teacher/SubHeader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TeacherDetailPage() {
  const theme = useTheme();
  const mobile = theme.breakpoints;

  const textStyles = {
    fontWeight: "bold",
    display: "flex",
    gap: 0.5,
    overflowWrap: "break-word", 
    textOverflow: "ellipsis", 
    [mobile.down("sm")]: {
      fontSize: "14px",
    },
    [mobile.up("sm")]: {
      fontSize: "16px",
    },
  };

  const textInput = {
    [mobile.down("sm")]: {
        fontSize: "14px",
      },
      [mobile.up("sm")]: {
        fontSize: "16px",
      }
  }
  return (
    <Box>
      {/* header */}
      <Header
        header="TEACHER DETAIL"
        subheader="These are teacher's information"
      />

      {/* card */}
      <Box sx={profileBox}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SubHeader title={"Teacher Information"} />
            <Button sx={buttonCard}>
              <BorderColorIcon color="primary" />
              <DeleteForeverIcon color="error" />
            </Button>
          </Box>
        </Box>
        {/* card detail */}
        <Box sx={cardDetail}>
          <Box sx={valueBoxOne}>
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box>
            <Typography sx={textStyles}>
              Teacher ID: <Typography sx={textInput}>ANB1000</Typography>
            </Typography>

            <Typography sx={textStyles}>
              Full Name: <Typography sx={textInput}>Potato Fried</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Age: <Typography sx={textInput}>18</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Gender: <Typography sx={textInput}>Female</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Date of Birth: <Typography sx={textInput}>01/01/2000</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Phone Number: <Typography sx={textInput}>01234567</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Email: <Typography sx={textInput}>mrpotato@123gmail.com</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Address:<Typography sx={textInput}>Potatoes village, french fried city</Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TeacherDetailPage;

const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  overflow: "hidden",
  position: "relative",
};

const profileBox = {
  border: "1px solid",
  borderColor: "#E0E0E0",
  borderRadius: "8px",
  marginTop: "32px",
  padding: {
    xs: 2,
    sm: 3,
  },
  display: "flex",
  flexDirection: "column",
};

const cardDetail = {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  mt: 2,
  position: "relative",
};

const buttonCard = {
  position: "absolute",
  bottom: "10px",
  right: "0",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
