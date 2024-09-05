import { Box, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
function GoBackButton({handleOnClick}) {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        color: "text.disabled",
        cursor: "pointer",
        ":hover": { color: "black" },
      }}
      onClick={handleOnClick}>
      <WestIcon fontSize="small" sx={{ alignSelf: "center" }} />
      <Typography variant="body1" fontWeight={600} lineHeight={"24px"}>
        Back
      </Typography>
    </Box>
  );
}

export default GoBackButton;
