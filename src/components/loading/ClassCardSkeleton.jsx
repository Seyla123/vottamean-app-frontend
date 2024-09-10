import { Avatar, Box, Chip, Skeleton, Stack } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

function ClassCardSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        borderRadius: "16px", // match card's borderRadius
        p: 4,
        width: "100%",
        height: { xs: "200px", sm: "250px" }, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)", // match card's shadow
      }}
    >
      {/* Header with icon and class name */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Avatar */}
          <Skeleton variant="circular" animation="wave" sx={{ height: "40px", ...styleOne}}>
            <Avatar />
          </Skeleton>

          {/* Class name */}
          <Skeleton animation="wave" sx={{ ...styleTwo, width:"60px", borderRadius: "8px"}} />
        </Box>

        {/* Day and icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton animation="wave" sx={{ ...styleTwo, width:"80px" }} />
        </Box>
      </Box>

      {/* Subject */}
      <Skeleton animation="wave" sx={{ ...styleOne, width:"120px", borderRadius: "8px" }} />

      {/* Footer with students and time */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Students count */}
        <Stack direction="row" spacing={1}>
          <Skeleton width="70px" animation="wave" sx={styleThree}>
            <Chip icon={<PermIdentityIcon />} label="total students" />
          </Skeleton>
        </Stack>

        {/* Time */}
        <Stack direction="row" spacing={1}>
          <Skeleton width="110px" animation="wave" sx={styleThree} />
        </Stack>
      </Box>
    </Box>
  );
}

export default ClassCardSkeleton;

const styleOne = {
    height:"40px" , bgcolor: "#e5e3e3"
}
const styleTwo = { 
    height:"32px" ,bgcolor: "#e5e3e3"
}
const styleThree = {
  height: "46px",
  borderRadius: "20px",
};
