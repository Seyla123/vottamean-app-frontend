import { Box, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import CardComponent from "../../../../components/common/CardComponent";
import CardInformation from "../../../../components/common/CardInformation";
import { useGetAttendanceQuery } from "../../../../services/attendanceApi";
import { useParams } from "react-router-dom";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import NotFoundPage from "../../../../pages/NotFoundPage";
import {formatAttendanceData} from '../../../../utils/formatData'
function AttendanceViewPage() {
  const [value, setValue] = useState("1");
  const [attendanceData, setAttendanecData] = useState([])
  const { id } = useParams();
  const { data : getAttendance, isLoading, isSuccess, isError, error } = useGetAttendanceQuery({id});
  useEffect(() => {
    if (isSuccess && getAttendance) {
      const formattedData = formatAttendanceData(getAttendance.data)
      setAttendanecData(formattedData)
    }
  }, [getAttendance]);
  if(isLoading){
    return <LoadingCircle/>
  }
  if(isError){
    return <NotFoundPage/>;
  }

  console.log('data : ', attendanceData);
  
  
  // --- handle --------
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
            <CardInformation data={attendanceData.attendance}></CardInformation>
          </CardComponent>
        )}

        {/* Student */}
        {value === "2" && (
          <CardComponent
            title={"Student Information"}
            imgUrl={"r"}
            onChange={handleStudent}
          >
            <CardInformation data={attendanceData.student}></CardInformation>
          </CardComponent>
        )}

        {/* Teacher */}
        {value === "3" && (
          <CardComponent
            title={"Teacher Information"}
            imgUrl={"r"}
            onChange={handleTeacher}
          >
            <CardInformation data={attendanceData.teacher}></CardInformation>
          </CardComponent>
        )}

        {/* Guardian */}
        {value === "4" && (
          <CardComponent
            title={"Guardian Information"}
            onChange={handleGuardian}
          >
            <CardInformation data={attendanceData.guardian}></CardInformation>
          </CardComponent>
        )}
      </FormComponent>
    </>
  );
}

export default AttendanceViewPage;

const tab = { whiteSpace: "normal", wordBreak: "break-word"}