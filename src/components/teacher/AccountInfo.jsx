import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import SubHeader from './SubHeader';

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

const textFieldGap = {
  display: "flex",
  gap: 0.5,
  flexDirection: "column",
};

const AccountInfo = ({ handleBack }) => {
  return (
    <Box sx={profileBox}>
      <Box component="form" width={"100%"} display={"flex"} flexDirection={"column"} sx={{
        gap: {
          xs: '12px',
          sm: 3
        }
      }}>
        <SubHeader title={"Account Information"} />
        {/* email */}
        <Box sx={textFieldGap}>
          <Typography>Email</Typography>
          <TextField
            id='email'
            placeholder='email'
            variant="outlined"
            fullWidth
          />
        </Box>
          {/* password */}
        <Box sx={textFieldGap}>
          <Typography>Password</Typography>
          <TextField
            id='password'
            placeholder='password'
            variant="outlined"
            fullWidth
          />
        </Box>
           {/* confirm password */}
        <Box sx={textFieldGap}>
          <Typography>Confirm Password</Typography>
          <TextField
            id='confirm-password'
            placeholder='confirm password'
            variant="outlined"
            fullWidth
          />
        </Box>
        {/* button */}
        <Box display={"flex"} alignSelf={"flex-end"} width={"100%"} sx={{maxWidth: {xs: "100%", sm: '340px'}}}  justifyContent={"flex-end"} gap={2}>
          <Button
            variant="outlined"
            sx={{ borderColor: "inherit", color: "inherit" }}
            onClick={handleBack}
            fullWidth
          >
            Back
          </Button>
          <Button
            fullWidth
            variant="contained"
          >
            Add Teacher
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountInfo;
