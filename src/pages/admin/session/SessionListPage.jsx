import React from "react";
import { Box, Button, Stack, Typography, Paper , useMediaQuery} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function SessionListPage() {

  const isMobile = useMediaQuery('(max-width: 600px)');

  const columns = [
    { field: "time", headerName: "Time",flex: 1 },
    { field: "day", headerName: "Day", flex: 1},
    !isMobile && { field: "subject", headerName: "Subject", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    !isMobile && { field: "teacher", headerName: "Teach by", flex: 2 },
    { field: "action", headerName: (<DeleteForeverIcon sx={{ color: "red" }}/>) , flex: 0.5,  },
  ].filter(Boolean);

  const rows = [
    {
      id: 1,
      time: "7:00 - 8:00",
      day: "Monday",
      subject: "Math",
      class: "12A",
      teacher: "Smey",
      action : "..."
    },
    {
      id: 2,
      time: "8:10 - 9:00",
      day: "Tuesday",
      subject: "Khmer",
      class: "12B",
      teacher: "Mary",
      action : "..."
    },
    {
      id: 3,
      time: "9:10 - 10:00",
      day: "Wednesday",
      subject: "English",
      class: "12C",
      teacher: "Jonh",
      action : "..."
    },
    {
      id: 4,
      time: "10:10 - 11:00",
      day: "Thursday",
      subject: "History",
      class: "12D",
      teacher: "Berry",
      action : "..."
    },
    {
      id: 5,
      time: "7:10 - 8:00",
      day: "Friday",
      subject: "Geography",
      class: "12D",
      teacher: "SoaPhorn",
      action : "..."
    },
    {
      id: 6,
      time: "9:10 - 10:00",
      day: "Saturday",
      subject: "Biology",
      class: "12D",
      teacher: "Tomas",
      action : "..."
    },
    {
      id: 7,
      time: "11:10 - 12:00",
      day: "Sunday",
      subject: "Chemistry",
      class: "12D",
      teacher: "Jerry",
      action : "..."
    },
    {
      id: 8,
      time: "7:00 - 8:00",
      day: "Monday",
      subject: "Math",
      class: "12A",
      teacher: "Smey",
      action : "..."
    },
    {
      id: 9,
      time: "8:10 - 9:00",
      day: "Tuesday",
      subject: "Khmer",
      class: "12B",
      teacher: "Mary",
      action : "..."
    },
    {
      id: 10,
      time: "9:10 - 10:00",
      day: "Wednesday",
      subject: "English",
      class: "12C",
      teacher: "Jonh",
      action : "..."
    },
    {
      id: 11,
      time: "10:10 - 11:00",
      day: "Thursday",
      subject: "History",
      class: "12D",
      teacher: "Berry",
      action : "..."
    },
    {
      id: 12,
      time: "7:10 - 8:00",
      day: "Friday",
      subject: "Geography",
      class: "12D",
      teacher: "SoaPhorn",
      action : "..."
    },
    {
      id: 13,
      time: "9:10 - 10:00",
      day: "Saturday",
      subject: "Biology",
      class: "12D",
      teacher: "Tomas",
      action : "..."
    },
    {
      id: 14,
      time: "11:10 - 12:00",
      day: "Sunday",
      subject: "Chemistry",
      class: "12D",
      teacher: "Jerry",
      action : "..."
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const content = { 
    maxWidth: 1200, 
    mx: "auto", 
    py: {
      xs: "24px",
      md: "32px"
    },  
    px: {
      xs : "24px",
      md : "32px"
    },
    bgcolor: "#F9FAFB"}

  return (
    <Box sx={content}>
      {/* head */}
      <Box sx={{ my: "16px" }}>
        <Box sx={{ my: "24px" }}>
          <Typography sx={{ fontSize:  "32px", fontWeight: "semibold" }}>
            SESSION LIST
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#666666" }}>
            There are 12 sessions
          </Typography>
        </Box>
        <Stack
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            my: "24px"
          }}
        >
          <Button variant="contained" sx={{width : "170px"}}>
            ADD SESSION
          </Button>
        </Stack>
      </Box>

      {/* List Session */}
      <Paper sx={{ height: 630, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{ border: 0}}
        />
      </Paper>
    </Box>
  );
}

export default SessionListPage;
