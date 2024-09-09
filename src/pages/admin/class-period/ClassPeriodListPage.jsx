import {
  useMediaQuery, Stack, Box, Button
} from "@mui/material";
import SimpleTable from "../../../components/table/SimpleTable";
import FormComponent from "../../../components/common/FormComponent";
function ClassPeriodListPage() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const header = [
    !isMobile && { field: "id", headerName: "ID", flex: 1 },
    { field: "start", headerName: "Start Time", flex: 2 },
    { field: "end", headerName: "End Time", flex: 2 },
    { field: "period", headerName: "Period", flex: 1 },
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
          }}>
          <Button variant="contained" sx={{ width: "170px" }}>
            ADD SESSION
          </Button>
        </Stack>

        {/* List Session */}
    <SimpleTable
      columns={header
      }
      data={rows}
      pagination={true}
      hiddenColumns={["id"]}
      onEdit={(row) => console.log("Edit", row)}
      onDelete={(row) => console.log("Delete", row)}
    />
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
  },
  {
    id: 2,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 3,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 4,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 5,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 6,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 7,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 8,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 9,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 10,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 11,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 12,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 13,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
  {
    id: 14,
    start: "8:00 AM",
    end: "5:00 PM",
    period: "8h",
  },
];

const paginationModel = { page: 0, pageSize: 10 };
