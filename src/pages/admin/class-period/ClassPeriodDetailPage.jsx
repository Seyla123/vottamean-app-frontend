import { Typography, Box } from "@mui/material";
import List from "@mui/material/List";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CardComponent from "../../../components/common/CardComponent";
import FormComponent from "../../../components/common/FormComponent";

function ClassPeriodDetailPage() {
  return (
    <>
      <FormComponent
        title={"Class Period Detail"}
        subTitle={"These are Class Period’s information"}>
        <CardComponent title={"Class Period Information"}>
          <Box>
            <List
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {Object.entries(info).map(([subject, value], index) => (
                <Box key={index} sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    sx={details}
                    fontWeight="medium">
                    {subject} :
                  </Typography>
                  <Typography sx={details}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </List>
          </Box>
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodDetailPage;

const info = {
  "Class Period ID": 123,
  "Start Time": "8:00 AM",
  "End Time": "8:30 AM",
  Period: "1h 30mn",
};

const details = { fontSize: { lg: "16px", xs: "14px" } }