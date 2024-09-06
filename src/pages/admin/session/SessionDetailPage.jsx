import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function SessionDetailPage() {

  return (
    <Box sx={content}>
      {/* Head */}
      <Box>
        <Box>
          <Typography sx={{ fontSize: "32px", fontWeight: "semibold" }}>
            SESSION DETAIL
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "#666666" }}>
            Session's information
          </Typography>
        </Box>
      </Box>

      {/* Session information */}
      <Box sx={form}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            SESSION DETAIL
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <ModeEditIcon sx={{ color: "#007EF2", fontSize: "18px" }} />
            <DeleteForeverIcon sx={{ color: "red", fontSize: "18px" }} />
          </Box>
        </Box>
        <Divider sx={{ my: "16px" }} />

        {/* information */}
        <Box component={"span"} sx={information}>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Teacher by :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              Smey
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Time :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              7:00 - 8:00
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Period :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              1h
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Subject :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              Math
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Class :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              12A
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Day of Week :{" "}
            <Box component={"span"} sx={{ fontWeight: "light" }}>
              Monday
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SessionDetailPage;

const content = {
  mx: "auto",
  my: "16px",
  display: "flex",
  flexDirection: "column",
  gap: {
    xs: "12px",
    md: "24px",
  },
};

const form = {
  maxWidth: 1064,
  bgcolor: "#FFFFFF",
  border: "1px solid #eee",
  borderRadius: "8px",
  p: "32px",
  boxShadow: 2,
};

const information = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  mt: "16px",
};
