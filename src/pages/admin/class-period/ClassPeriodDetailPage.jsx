import { Divider, Card, Typography, Box } from "@mui/material";
import List from "@mui/material/List";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function ClassPeriodDetailPage() {

  const info = {
    "Class Period ID": 123,
    "Start Time": "8:00 AM",
    "End Time": "8:30 AM",
    Period: "1h 30mn",
  };

  const content = { lg: "32px", xs: "24px" };
  const section = { my: 0, fontSize: { lg: 32, xs: 20 } };
  const title = { fontSize: { lg: 16, xs: 14 } };
  const infoArea = {
    boxShadow: 1,
    px: { lg: "32px", xs: "24px" },
    pt: { lg: "24px", xs: "16px" },
    pb: "32px" };
  const divider = {
    bgcolor: "black",
    my: "16px",
    mt: { lg: "16px", xs: "8px" },
  };

  return (
    <Box>
      <Box sx={{ my: content }}>
        <Typography fontWeight="bold" sx={section}>
          ADD CLASS PERIOD
        </Typography>
        <Typography color="textDisabled" sx={title}>
          Please Fill Class Period Information
        </Typography>
      </Box>

      <Card sx={infoArea}>
        <Box>
          <Typography sx={{ fontSize: 18 }} fontWeight="bold">
            Class Period Information
          </Typography>
          <ModeEditIcon/>
          <DeleteForeverIcon/>

        </Box>
        <Divider sx={divider} />
        <Box>
          <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Object.entries(info).map(([subject, value], index) => (
              <Box key={index} sx={{ display: "flex", gap: 1 }}>
                <Typography
                  sx={{ fontSize: { lg: "16px", xs: "14px" } }}
                  fontWeight="medium">
                  {subject} :
                </Typography>
                <Typography sx={{ fontSize: { lg: "16px", xs: "14px" } }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </List>
        </Box>
      </Card>
    </Box>
  );
}

export default ClassPeriodDetailPage;
