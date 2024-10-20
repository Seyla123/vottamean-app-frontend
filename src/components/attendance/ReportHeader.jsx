import React from "react";
import { Box} from "@mui/material";
import StatusGrid from "./StatusGrid"; 
import { shadow } from "../../styles/global"; 

const ReportHeader = ({ data }) => {

  const dataCount = data.reduce((acc, { status, total }) => {
    acc[status.charAt(0).toUpperCase() + status.slice(1)] = total; // Capitalizes the first letter
    return acc;
}, { Present: 0, Late: 0, Permission: 0, Absent: 0 });
  
  return (
    <Box sx={cardGrid}>

      <StatusGrid statusCounts={dataCount} />
    </Box>
  );
};

export default ReportHeader;

const cardGrid = {
  display: "flex",
  flexDirection: 'column',
  gap: 1,
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "white",
  ...shadow
};

const boxGrid = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  p: 2,
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
