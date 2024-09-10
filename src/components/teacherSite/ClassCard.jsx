import React from "react";
import { CardContent, Box, Typography, Stack, Chip, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { cardContainer } from "../../styles/global";
import { styled } from "@mui/material/styles";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TodayIcon from '@mui/icons-material/Today';
const IconContainer = styled(Box)({
  width: '60px',
  height: '60px',
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ClassCard = ({
  className,
  day,
  subject,
  students,
  time,
  classIcon,
  randomColor,
}) => {
  return (
    <CardContent sx={{ ...cardStyle, bgcolor: randomColor }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* class icon */}
          <IconContainer sx={{ display: "flex", alignItems: "center"}}>
            <Avatar
              variant="square"
              src={classIcon}
              alt="class list picture"
              sx={{ width: 40, height: 40 }}
            />
          </IconContainer>
          
          {/* class */}
          <Typography sx={classSize} fontWeight="medium">
            {className}
          </Typography>
        </Box>
        {/* day */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography sx={daySize}>{day}</Typography>
          <TodayIcon />
        </Box>
      </Box>
      {/* subject */}
      <Typography sx={subjectSize}>{subject}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* total students */}
        <Stack sx={timeSize}>
          <Chip  
          label={students}
          color="black"
          icon={<PermIdentityIcon/>}>
          <span>Students</span>
          </Chip>
        </Stack>
        {/* time */}
        <Stack direction="row" spacing={1}>
          <Chip
            label={time}
            sx={{ bgcolor: "#7bba3b", color: "white" }}
            size=""
            variant="contained"
            icon={<AccessTimeIcon color="inherit"/>} 
          />
        </Stack>
      </Box>
    </CardContent>
  );
};

export default ClassCard;

const cardStyle = {
  ...cardContainer,
  borderRadius: "16px",
  height: { xs: "200px", sm: "250px" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

// styles for mobile
const subjectSize = {
  fontSize: { xs: "24px", sm: "32px" },
  fontWeight: "medium",
  letterSpacing: 0.5,
};

const daySize = {
  fontSize: { xs: "16px", sm: "18px" },
  fontWeight: "medium",
};

const timeSize = {
  fontSize: { xs: "14px", sm: "16px" },
  fontWeight: "medium",
};

const classSize = {
  fontSize: { xs: "20px", sm: "22px" },
  fontWeight: "medium",
};
