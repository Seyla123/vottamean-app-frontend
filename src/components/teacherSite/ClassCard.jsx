import React from "react";
import {
  CardContent,
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Divider,
  Card,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Class from "../../assets/icon/classroom.png";
import Pencil from "../../assets/icon/whiteboard.png";
import { cardContainer } from "../../styles/global";
import theme from "../../styles/theme";

const ClassCard = ({
  className,
  day,
  subject,
  students,
  time,
  randomColor,
}) => {
  return (
    <CardContent sx={{ ...cardStyle, bgcolor: 'white' }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        {/* day */}
        <Stack sx={daySize}>
          <Chip
            label={day}
            color="default"
            sx={{  bgcolor: randomColor }}
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            bgcolor: "white",
          }}
        >
          {/* icon */}
          <Avatar
            variant="square"
            src={Pencil}
            alt="pencil icon"
            sx={{ width: 24, height: 24}}
          />
        </Box>
      </Box>
        {/* subject and time */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={subjectSize}>{subject}</Typography>
        <Typography sx={timeSize}>{time}</Typography>
      </Box>
      <Divider color="#e3e3e3" sx={{ width: "100%", borderBottomWidth: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ display: "flex",flexDirection: "row", alignItems: "center", gap: 1 }}>
          {/* class icon */}
          <Box sx={{bgcolor: "#e3e3e3",padding: 0.5 , borderRadius: '50%'}}>
            <Avatar
              variant="square"
              src={Class}
              alt="class list picture"
              sx={{ padding: 1, borderRadius: '50%', bgcolor: 'white'}}
            />
          </Box>
          {/* class */}
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Typography sx={{color: theme.palette.secondary.main}}>Class</Typography>
            {/* class name */}
            <Typography sx={daySize} fontWeight="medium">
              {className}
            </Typography>
          </Box>
        </Stack>
        {/* total students */}
        <Stack sx={timeSize}>
          <Chip
            label={`${students}`}
            color="default"
            icon={<PermIdentityIcon />}
          />
        </Stack>
      </Box>
    </CardContent>
  );
};

export default ClassCard;

const subjectSize = {
  fontSize: { xs: "24px", sm: "32px" },
  fontWeight: "medium",
  letterSpacing: 0.5,
};

const daySize = {
  fontSize: { xs: "16px", sm: "18px" },
  fontWeight: "medium",
  color: "black",
};

const timeSize = {
  fontSize: { xs: "12px", sm: "14px" },
  fontWeight: "bold",
};

const cardStyle = {
  ...cardContainer,
  borderRadius: "16px",
  padding: {
    xs: 2,
    sm: 3,
  },
};
