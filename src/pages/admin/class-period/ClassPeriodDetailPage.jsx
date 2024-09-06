import { Divider, Card, Typography, Box, Button, Stack, } from "@mui/material";
import List from "@mui/material/List";
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import {ModeEditIcon, DeleteForeverIcon} from "@mui/icons-material"

function ClassPeriodDetailPage() {
  const content = { lg: "32px", xs: "24px" };
  const section = { my: 0, fontSize: { lg: 32, xs: 20 } };
  const title = { fontSize: { lg: 16, xs: 14 } };
  const divider = { bgcolor: "black" };
  
  const info = {
    "Class Period ID": 123,
    "Start Time": "8:00 AM",
    "End Time": "8:30 AM",
    "Period": "1h 30mn"
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

      <Card sx={{boxShadow: 1, p: {lg: "24px", xs: "16px"}, display: "flex", flexDirection: "column", gap: "24px"}}>
        <Typography sx={{ fontSize: 18 }} fontWeight="bold">
          Class Period Information
        </Typography>
        <Divider sx={divider} />
        <Box>
          <List>
            <li>
              {Object.entries(info).map(([subject, value], index) => (
                <Box key={index} sx={{ display: "flex", gap: 1 }}>
                  <Typography fontWeight="medium">{subject} :</Typography>
                  <Typography>{value}</Typography>
                </Box>
              ))}
            </li>
          </List>
        </Box>
      </Card>
    </Box>
  );
}

export default ClassPeriodDetailPage;
