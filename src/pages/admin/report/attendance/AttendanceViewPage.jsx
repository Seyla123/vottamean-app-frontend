import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import CardComponent from "../../../../components/common/CardComponent";
import CardInformation from "../../../../components/common/CardInformation";

function AttendanceViewPage() {
  const [value, setValue] = useState("1");

  // --- handle --------------
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAttendance = () => {
    if (value === "1") {
      setValue("2");
    }
  };
  const handleStudent = () => {
    if (value === "2") {
      setValue("3");
    }
  };
  const handleTeacher = () => {
    if (value === "3") {
      setValue("4");
    }
  };
  const handleGuardian = () => {
    if (value === "4") {
      setValue("1");
    }
  };
  const deleteButton = () => {
    console.log("delete");
  };

  // -- data ----------------
  const attendance = {
    "Student's Name": "Potato Fried",
    Class: "AnB",
    Subject: "Web Development",
    Time: "8:00 AM - 9:30 AM",
    Period: "1h30min",
    "Teacher's Name": "Teacher A",
    Status: "Present",
    Date: "22/02/2024",
  };
  const student = {
    "Student ID": "ANB00101",
    Name: "Potato Fried",
    Class: "AnB",
    Age: 18,
    Gender: "Male",
    "Date of Birth": "01/01/2002",
    Phone: "01234567",
    Email: "mrrseyl123@gmail.com",
    Address: "Potato Chip City, FrenchFried Country",
  };
  const teacher = {
    "Teacher ID": "ANB00101",
    Name: "Teacher A",
    Age: 18,
    Gender: "Male",
    "Date of Birth": "01/02/2002",
    Phone: "01234567",
    Email: "mrrseyl123@gmail.com",
    Address: "Potato Chip City, FrenchFried Country",
  };
  const guardian = {
    "Guardian's Name": "Potato",
    Relationship: "Father",
    Phone: "01234567",
    Email: "mrrseyla123@gmail.com",
  };
  return (
    <>
      {/* Header */}
      <FormComponent
        title={"View Attendance"}
        subTitle={"These are Attendance’s Detail Information"}
      >
        {/* Tab */}
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="tabs information"
        >
          <Tab label="ATTENDANCE" value="1" sx={tab} />
          <Tab label="STUDENT" value="2" sx={tab} />
          <Tab label="TEACHER" value="3" sx={tab} />
          <Tab label="GUARDIAN" value="4" sx={tab} />
        </Tabs>
        {/* Attendance */}
        {value === "1" && (
          <CardComponent
            title={"Attendance Information"}
            handleDelete={deleteButton}
            onChange={handleAttendance}
          >
            <CardInformation data={attendance}></CardInformation>
          </CardComponent>
        )}

        {/* Student */}
        {value === "2" && (
          <CardComponent
            title={"Student Information"}
            imgUrl={"r"}
            onChange={handleStudent}
          >
            <CardInformation data={student}></CardInformation>
          </CardComponent>
        )}

        {/* Teacher */}
        {value === "3" && (
          <CardComponent
            title={"Teacher Information"}
            imgUrl={"r"}
            onChange={handleTeacher}
          >
            <CardInformation data={teacher}></CardInformation>
          </CardComponent>
        )}

        {/* Guardian */}
        {value === "4" && (
          <CardComponent
            title={"Guardian Information"}
            onChange={handleGuardian}
          >
            <CardInformation data={guardian}></CardInformation>
          </CardComponent>
        )}
      </FormComponent>
    </>
  );
}

export default AttendanceViewPage;

const tab = { whiteSpace: "normal", wordBreak: "break-word"}