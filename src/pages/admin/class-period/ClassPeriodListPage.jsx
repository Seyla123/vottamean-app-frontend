import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormComponent from "../../../components/common/FormComponent";

function ClassPeriodListPage() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const columns = [
    !isMobile && { field: "id", headerName: "ID", flex: 1 },
    { field: "start", headerName: "Start Time", flex: 2 },
    { field: "end", headerName: "End Time", flex: 2 },
    { field: "period", headerName: "Period", flex: 1 },
    {
      field: "action",
      headerName: <DeleteForeverIcon sx={{ color: "red" }} />,
      flex: 0.5,
    },
  ].filter(Boolean);

  return (
    <Box>
      <FormComponent
        title={"Class Period List"}
        subTitle={"There are 24 Class Periods"}>
        <Stack
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            my: "24px",
          }}>
          <Button variant="contained" sx={{ width: "170px" }}>
            ADD SESSION
          </Button>
        </Stack>

        {/* List Session */}
        <Paper sx={{ height: 630, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{ border: 0 }}/>
        </Paper>
      </FormComponent>
    </Box>
  );
}

export default ClassPeriodListPage;

const rows = [
  {
    id: 1,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 2,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 3,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 4,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 5,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 6,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 7,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 8,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 9,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 10,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 11,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 12,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 13,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
  {
    id: 14,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
    action: "...",
  },
];

const paginationModel = { page: 0, pageSize: 10 };
