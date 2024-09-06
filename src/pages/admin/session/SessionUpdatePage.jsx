import React from 'react';

import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Divider,
  Card
} from "@mui/material";

function SessionUpdatePage() {
  const teachers = [
    {
      value: "teacher1",
      label: "Smey",
    },
    {
      value: "teacher2",
      label: "Mary",
    },
    {
      value: "teacher3",
      label: "Berry",
    },
  ];

  const period = [
    {
      value: "period1",
      label: "7:00 - 8:00",
    },
    {
      value: "period2",
      label: "8:10 - 9:00",
    },
    {
      value: "period3",
      label: "9:10 - 10:00",
    },
  ];

  const classes = [
    {
      value: "class1",
      label: "12A",
    },
    {
      value: "class2",
      label: "12B",
    },
    {
      value: "class3",
      label: "12C",
    },
  ];

  const subject = [
    {
      value: "math",
      label: "Math",
    },
    {
      value: "khmer",
      label: "Khmer",
    },
    {
      value: "english",
      label: "English",
    },
  ];
  const dow = [
    {
      value: "mon",
      label: "Monday",
    },
    {
      value: "tues",
      label: "Tuesday",
    },
    {
      value: "wed",
      label: "Wednesday",
    },
  ];

  const form = {
    maxWidth: "1064px",
    padding: "32px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };
  const container = {
    "& .MuiTextField-root": { width: 1 },
    width: "100%",
    display: "grid",
    gap: {
      xs : "12px", 
      md : "24px"
    },
    margin: "0 auto",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)",
      md: "repeat(2, 1fr)",
    },
  };
  const textInput = { width: 1 };


  const buttonContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "16px",
    width: 1,
    my : "16px"
  };

  const button = {
    width: {
      md: "170px",
      xs: "100%",
    },
  };
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", my: "32px", px: "32px" }}>
      {/* Header */}
      <Box sx={{ maxWidth: 1064, my: "32px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "semibold" }}>
          ADD SESSION
        </Typography>
        <Typography sx={{ color: "#666666", fontSize: "16px" }}>
          Please Fill Session information
        </Typography>
      </Box>

      {/* Form */}
      <Card sx={form}>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Session Information
        </Typography>
        <Divider sx={{ my: "16px" }} />
        <Box component="form" sx={container} noValidate autoComplete="off" >
          {/* Teacher */}
          <Box sx={textInput}>
            <Typography sx={{ fontSize: "16px" }}>Teacher</Typography>
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="teacher1"
            >
              {teachers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* Period */}
          <Box sx={textInput}>
            <Typography sx={{ fontSize: "16px", maxwidth: "524px" }}>
              Class Period
            </Typography>
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="period1"
            >
              {period.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Classes */}
          <Box sx={textInput}>
            <Typography sx={{ fontSize: "16px" }}>Class</Typography>
            <TextField
              id="outlined-select-currency"
              select
              defaultValue={"class1"}
            >
              {classes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* Subject */}
          <Box sx={textInput}>
            <Typography sx={{ fontSize: "16px" }}>Subject</Typography>
            <TextField
              id="outlined-select-currency"
              select
              defaultValue={"math"}
            >
              {subject.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Dow */}
          <Box sx={textInput}>
            <Typography sx={{ fontSize: "16px" }}>Day of Week</Typography>
            <TextField id="outlined-select-currency" select defaultValue="mon">
              {dow.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Button  */}
        <Stack sx={buttonContainer}>
          <Button variant="outlined" sx={button} color="white">
            Cancel
          </Button>
          <Button variant="contained" sx={button}>
            ADD SESSION
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default SessionUpdatePage;
