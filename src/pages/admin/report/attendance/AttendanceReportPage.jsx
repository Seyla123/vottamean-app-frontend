import React, {useEffect, useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { DownloadIcon } from "lucide-react";
import AttendanceTable from "../../../../components/teacherSite/AttendanceTable";
import CalendarImage from "../../../../assets/icon/calendar.png";
import FilterComponent from "../../../../components/common/FilterComponent";
import { shadow } from "../../../../styles/global";
import {
  CheckCheckIcon,
  AlarmClockIcon,
  CircleX,
  PencilIcon,
} from "lucide-react";
import theme from "../../../../styles/theme";
import { useGetAllAttendanceQuery } from "../../../../services/attendanceApi";
import {transformAttendanceData} from "../../../../utils/formatData"
import LoadingCircle from "../../../../components/loading/LoadingCircle"
// --- data --------------------------------
// column styles
const columns = [
  { id: "id", label: "StudentID" },
  { id: "name", label: "Name" },
  { id: "time", label: "Time" },
  { id: "subject", label: "Subject" },
  { id: "class", label: "Class" },
  { id: "address", label: "Address" },
];

const AttendanceReportPage = () => {
  const { data: allAttendanceData, isLoading, isSuccess } = useGetAllAttendanceQuery();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Transform API response into table data format
    console.log(allAttendanceData);
    if(allAttendanceData){
      const formattedData = transformAttendanceData(allAttendanceData.data)
      console.log(formattedData);
      setRows(formattedData);
    }
},[allAttendanceData, isLoading, isSuccess])

  const [subjectValue, setSubjectValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // --- Filters --------------------------------
  // subjects
  const subjects = [
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ];
  // handle subjects
  const handleSubjectChange = (event) => {
    setSubjectValue(event.target.value);
  };
  // classes
  const classes = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
    { value: "Class C", label: "Class C" },
  ];
  //handle class
  const handleClassChange = (event) => {
    setClassValue(event.target.value);
  };
  // filter
  const filter = [
    { value: "All", label: "All" },
    { value: "Today", label: "Today" },
  ];
  // handle filter
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Status updates
  const statusDetails = [
    { label: "Present", color: "#28a745", icon: CheckCheckIcon },
    { label: "Late", color: "#fd7e14", icon: AlarmClockIcon },
    { label: "Permission", color: "#007bff", icon: PencilIcon },
    { label: "Absent", color: "#dc3545", icon: CircleX },
  ];

  // --- Table status change functions --------------------------------
  const handleStatusChange = (updatedRow, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedRow.id ? { ...row, status: newStatus } : row
      )
    );
  };

  // --- Count status --------------------------------
  const statusCounts = {};
  rows.forEach((row) => {
    if (!statusCounts[row.status]) {
      statusCounts[row.status] = 1;
    } else {
      statusCounts[row.status]++;
    }
  });

  // handle export 
  const handleExport = () => {
    console.log('click')
  }
  if(isLoading){
    return <LoadingCircle/>
  }
  return (
    <FormComponent title={"Attendance Report"} subTitle={"Report"}>
      {/* Cards Grid */}
      <Box sx={cardGrid}>
        <Box sx={boxGrid}>
          <Typography variant="h4" fontWeight={"bold"}>
            Today's report
          </Typography>
          <Avatar
            variant="square"
            src={CalendarImage}
            alt="Calendar Icon"
            sx={avatar}
          />
        </Box>
        <Box sx={{ width: "100%", ...shadow }}>
          <Grid column={14} container sx={gridContainer}>
            {statusDetails.map(({ icon: Icon, label, color }, index) => (
              <Grid key={index} item xs={6} sm={3} sx={gridIcon}>
                <Avatar sx={{ bgcolor: color, width: 40, height: 40, mb: 1 }}>
                  <Icon color="white" size={20} />
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  {label}
                </Typography>
                <Typography variant="h5">
                  {statusCounts[label]?.toString().padStart(2, "0") || "00"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Filter */}
      <Box sx={boxStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignSelf: "start",
          }}
        >
          <FilterComponent
            value={subjectValue}
            data={subjects}
            onChange={handleSubjectChange}
            placeholder={"By Subject"}
          />
          <FilterComponent
            value={classValue}
            data={classes}
            onChange={handleClassChange}
            placeholder={"By Class"}
          />
        </Box>
        <Box alignSelf={"end"}>
          <FilterComponent
            value={filterValue}
            data={filter}
            onChange={handleFilterChange}
            placeholder={"Filter"}
          />
           
        </Box>
      </Box>

      {/* Table */}
      <AttendanceTable
        rows={rows}
        columns={columns}
        status={statusDetails.map((s) => s.label)}
        hideColumns={["time", "subject", "class", "address"]}
        onStatusChange={handleStatusChange}
      />

      <Button
        variant="contained"
        endIcon={<DownloadIcon size={16} />}
        onClick={handleExport}
        sx={{ alignSelf: "flex-end" }}
      >
        Export List
      </Button>
    </FormComponent>
  );
};

export default AttendanceReportPage;


const boxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  width: "100%",
  gap: 2,
};
const cardGrid = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  gap: 1,
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}
const gridContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  p: 1,
  width: "100%",
}
const gridIcon = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  p: 1,
  overflow: "hidden",
}
const avatar ={
  width: {
    xs: "80px",
    sm: "100px",
  },
  height: {
    xs: "80px",
    sm: "100px",
  },
  objectFit: "cover",
}
const boxGrid = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  p: 2,
  ...shadow,
}