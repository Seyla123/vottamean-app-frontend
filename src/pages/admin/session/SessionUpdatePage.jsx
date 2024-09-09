import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
function SessionUpdatePage() {
  const onClickBack = () => {
    console.log('cancel');

}
const onClickNext = () => {
    console.log('submit');

}
  return (
    <FormComponent title={'Update session'} subTitle={'Please Fill session information'}>
      <CardComponent title={'Session Information'}>
            <Box component="form" sx={container} noValidate autoComplete="off">
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
                <Typography sx={{ fontSize: "16px" }}>Class Period</Typography>
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
            {/* Button Container  */}
            <ButtonContainer 
                        leftBtn={onClickBack} 
                        rightBtn={onClickNext} 
                        leftBtnTitle={'Cancel'} 
                        rightBtnTitle={'Update'} 
                    />


      </CardComponent>
    </FormComponent>
  );
}

export default SessionUpdatePage;

  // MUI
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

  const textInput = {
    width: 1,
    display: "flex ",
    flexDirection: "column",
    gap: "4px",
  };