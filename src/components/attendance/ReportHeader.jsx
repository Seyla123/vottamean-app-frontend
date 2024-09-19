import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import StatusGrid from "./StatusGrid"; 
import CalendarImage from "../../assets/icon/calendar.png"; 
import { shadow } from "../../styles/global"; 

const ReportHeader = ({ statusCounts }) => {
  return (
    <Box sx={cardGrid}>
      <Box sx={boxGrid}>
        <Typography variant="h4" fontWeight={"bold"}>
          Today's report
        </Typography>
        <Avatar
          variant="square"
          src={CalendarImage}
          alt="Calendar Icon"
          sx={avatar}
        />
      </Box>
      <StatusGrid statusCounts={statusCounts} />
    </Box>
  );
};

export default ReportHeader;

const cardGrid = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  gap: 1,
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

const boxGrid = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  p: 2,
  ...shadow,
};

const avatar = {
  width: {
    xs: "80px",
    sm: "100px",
  },
  height: {
    xs: "80px",
    sm: "100px",
  },
  objectFit: "cover",
};
