
import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Select, MenuItem } from '@mui/material';
import SubHeader from './SubHeader';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerComponent from './DatePickerComponent';

const profileBox = {
  border: "1px solid",
  borderColor: "#E0E0E0",
  borderRadius: "8px",
  bgcolor: "#ffffff",
  marginTop: "32px",
  padding: {
    xs: 2,
    sm: 3,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
};

const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 2,
  position: "relative",
};

const textFieldGap = {
  display: "flex",
  gap: 0.5,
  flexDirection: "column",
};



const TeacherInfo = ({ handleNext }) => {
  const [gender, setGender] = useState('');
  const [value, setValue] = useState(null);

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <Box sx={profileBox}>
      <Box sx={valueBoxOne}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Button
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "#ffffff",
            borderRadius: "50%",
            p: 1,
            "&:hover": {
              bgcolor: "#f0f0f0",
            },
          }}
        >
        </Button>
      </Box>

      <SubHeader title={"Teacher Information"} />

      <Box component="form" width={"100%"} mt={2} display={"flex"} flexDirection={"column"} sx={{
        gap: {
          xs: '12px',
          sm: 3
        }
      }}>
        <Box display={"flex"} flexDirection={"row"} sx={{
          gap: {
            xs: '12px',
            sm: 3
          },
          width: "100%"
        }}>
          {/* name */}
          <Box sx={{ flex: 1 }}>
            <Box sx={textFieldGap}>
              <Typography>First Name</Typography>
              <TextField
                id='first-name'
                placeholder='first name'
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={textFieldGap}>
              <Typography>Last Name</Typography>
              <TextField
                id='last-name'
                placeholder='last name'
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
         {/* gender */}
        <Box sx={textFieldGap}>
          <Typography>Gender</Typography>
          <Select
            fullWidth
            value={gender}
            onChange={handleChangeGender}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <Box component="p" variant="body2" sx={{ color: '#a7a7a7' }}>gender</Box>;
              }
              return selected;
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </Box>
        {/* date of birth */}
        <Box sx={textFieldGap}>
          <Typography>Date of Birth</Typography>
          <DatePickerComponent/>
        </Box>
           {/* phone number */}
        <Box sx={textFieldGap}>
          <Typography>Phone Number</Typography>
          <TextField
            id='phone-number'
            placeholder='phone number'
            variant="outlined"
            fullWidth
          />
        </Box>
        {/* address */}
        <Box sx={textFieldGap}>
          <Typography>Address</Typography>
          <TextField
            id='address'
            placeholder='address'
            variant="outlined"
            fullWidth
          />
        </Box>
        {/* next button */}
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            sx={{ width: { xs: '100%', sm: "170px" } }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherInfo;