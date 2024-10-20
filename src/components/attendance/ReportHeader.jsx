import React from "react";
import { Box} from "@mui/material";
import StatusGrid from "./StatusGrid"; 
import { shadow } from "../../styles/global"; 

const ReportHeader = ({ data }) => {

  const dataCount = data.length === 0 ? { Present: 0, Late: 0, Permission: 0, Absent: 0 } : data.reduce((acc, { status, total }) => {
    acc[status.charAt(0).toUpperCase() + status.slice(1)] = total !== null && total !== undefined ? total : 0; // Capitalizes the first letter
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
  paddingY:{
    sm:4
  },
  backgroundColor: "white",
  ...shadow
};

