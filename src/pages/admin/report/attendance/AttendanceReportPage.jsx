import React, { useEffect, useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import { Button } from "@mui/material";
import { DownloadIcon } from "lucide-react";
import AttendanceTable from "../../../../components/attendance/AttendanceReportTable";
import { shadow } from "../../../../styles/global";
import { useGetAllAttendanceQuery } from "../../../../services/attendanceApi";
import { transformAttendanceData } from "../../../../utils/formatData"
import LoadingCircle from "../../../../components/loading/LoadingCircle"
import ReportHeader from "../../../../components/attendance/ReportHeader";
import FilterSection from "../../../../components/attendance/FilterSection";
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
  // Define the parameters for the query
  const [subjectValue, setSubjectValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { data: allAttendanceData, isLoading, isSuccess } = useGetAllAttendanceQuery({
    classId: classValue,
    subjectId: subjectValue,
    filter: filterValue,
  });
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Transform API response into table data format
    if (isSuccess && allAttendanceData) {
      console.log(allAttendanceData);
      const formattedData = transformAttendanceData(allAttendanceData.data);
      console.log(formattedData);
      setRows(formattedData);
    }
  }, [allAttendanceData, isSuccess, subjectValue, classValue, filterValue])


  // --- Filters --------------------------------
  // subjects
  const subjects = [
    { id: 1, subjectName: "Math" },
    { id: 2, subjectName: "Science" },
    { id: 3, subjectName: "English" },
  ];
  console.log(subjects.value);
  
  // handle subjects
  const handleSubjectChange = (event) => {
    setSubjectValue(event.target.value);
  };
  // classes
  const handleClassChange = (event) => {
    setClassValue(event.target.value);
  };
  // handle filter
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const classes = [
    { value: 1, label: "Class A" },
    { value: 2, label: "Class B" },
    { value: 3, label: "Class C" },
  ];
  //handle class
  // filter
  const filter = [
    { value: "All", label: "All" },
    { value: "today", label: "Today" },
  ];

  // --- Count status --------------------------------
  // handle export 
  const handleExport = () => {
    console.log('click export')
  }
  if (isLoading) {
    return <LoadingCircle />
  }
  const statusCounts = {
    Present: 0,
    Late: 0,
    Permission: 0,
    Absent: 0,
  };
  rows.forEach((row) => {
    if (row.status) {
      statusCounts[row.status] = (statusCounts[row.status] || 0) + 1;
    }
  });
  return (
    <FormComponent title={"Attendance Report"} subTitle={"Report"}>
      {/* Cards Grid */}
      <ReportHeader 
        statusCounts={statusCounts} 
      /> 

      {/* Filter Section */}
      <FilterSection
        subjectValue={subjectValue}
        classValue={classValue}
        filterValue={filterValue}
        subjects={subjects}
        classes={classes}
        filter={filter}
        handleSubjectChange={handleSubjectChange}
        handleClassChange={handleClassChange}
        handleFilterChange={handleFilterChange}
      />

      {/* Table */}
      <AttendanceTable
        rows={rows}
        columns={columns}
        hideColumns={["Name", "id", "subject", "class", "address"]}
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
const avatar = {
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