import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Header from "../../../components/teacher/Header";
import SubHeader from "../../../components/teacher/SubHeader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TeacherDetailPage() {
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
            <Typography sx={{ fontWeight: "bold",fontSize: { xs: "14px", sm: 2 }, display: "flex", gap:0.5}}>Teacher ID : <Typography>
                Name
            </Typography>

            </Typography>
            <Typography>Hii</Typography>
            <Typography>Hii</Typography>
            <Typography>Hii</Typography>
            <Typography>Hii</Typography>
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
  gap: 2,
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

const text = { fontWeight: "bold",fontSize: { xs: "14px", sm: 2 }, display: "flex", gap:0.5}