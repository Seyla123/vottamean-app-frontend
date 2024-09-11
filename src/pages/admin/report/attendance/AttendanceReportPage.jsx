import React, { useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import FilterComponent from "../../../../components/common/FilterComponent";
import { Button, Stack, Box, IconButton } from "@mui/material";
import AttendanceTable from "../../../../components/teacherSite/AttendanceTable";
import {DownloadIcon} from 'lucide-react'
const columns = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "time",
    label: "Time",
  },
  {
    id: "subject",
    label: "Subject",
  },
  {
    id: "class",
    label: "Class",
  },
  {
    id: "address",
    label: "Address",
  },
];

const data = [
  {
    id: 31,
    name: "Kunthea Chhum",
    time: "7:00 - 8:00",
    subject: "Web Development",
    class: "Class 1",
    address: "Takeo",
    status: "Present",
  },

  {
    id: 21,
    name: "Teddy ",
    time: "7:00 - 11:00",
    subject: "Web Development",
    class: "Class 2",
    address: "Takeo",
    status: "Late",
  },
];

function AttendanceReportPage() {
  // States for each filter
  const [subjectValue, setSubjectValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Handle change based on filter type
  const handleChange = (event, newValue, type) => {
    if (type === "subject") {
      setSubjectValue(newValue);
    } else if (type === "class") {
      setClassValue(newValue);
    } else if (type === "filter") {
      setFilterValue(newValue);
    }
  };

  // Data
  const subjects = [
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ];
  const classes = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
    { value: "Class C", label: "Class C" },
  ];
  const filter = [
    { value: "All", label: "All" },
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

  const [rows, setRows] = useState(data);
  const status = ["Present", "Absent", "Late", "Permission"];
  const hideColumns = ['time', 'subject','address'];
  const handleStatusChange = (updatedRow, newStatus) => {
    setRows(prevRows =>
        prevRows.map(row =>
            row.id === updatedRow.id ? { ...row, status: newStatus } : row
        )
    );
    console.log(`Changed ${updatedRow.name} to ${newStatus}`);
};
  return (
    <>
      <FormComponent
        title={"Report Attendance"}
        subTitle={`These are ${rows.length} records`}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
            
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {/* subject */}
            <FilterComponent
              value={subjectValue}
              data={subjects}
              onChange={(e, newValue) => handleChange(e, newValue, "subject")}
              placeholder={"By Subject"}
              customStyles={filterStyle}
            />
            {/* classes */}
            <FilterComponent
              value={classValue}
              data={classes}
              onChange={(e, newValue) => handleChange(e, newValue, "class")}
              placeholder={"By Class"}
              customStyles={filterStyle}
            />
            {/* filter */}
            <FilterComponent
              value={filterValue}
              data={filter}
              onChange={(e, newValue) => handleChange(e, newValue, "filter")}
              placeholder={"Filter"}
              customStyles={filterStyle}
            />
          </Stack>
          <Stack >
            <Button sx={{ width:'fit-content' , alignSelf:'flex-end'}} variant="contained" color="primary" startIcon={<DownloadIcon size={20}/>}>
              EXPORT
            </Button>
          </Stack>
        </Box>
        <AttendanceTable

            rows={rows}
            columns={columns}
            status={status}
            hideColumns={hideColumns}
            onStatusChange={handleStatusChange}
        />
      </FormComponent>
    </>
  );
}

export default AttendanceReportPage;
const filterStyle = {
  width: {
    xs: "126px",
    sm: "154px",
  },
};
