import { Box, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import CardComponent from "../../../../components/common/CardComponent";
import CardInformation from "../../../../components/common/CardInformation";
import { useGetAttendanceQuery } from "../../../../services/attendanceApi";
import { useParams } from "react-router-dom";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import NotFoundPage from "../../../../pages/NotFoundPage";
import { formatAttendanceData } from "../../../../utils/formatData";

const tabs = [
  {
    label: "ATTENDANCE",
    value: "1",
  },
  {
    label: "STUDENT",
    value: "2",
  },
  {
    label: "TEACHER",
    value: "3",
  },
  {
    label: "GUARDIAN",
    value: "4",
  },
];

function AttendanceViewPage() {
  const { id } = useParams();
  const [value, setValue] = useState(tabs[0].value);
  const { data: getAttendance, isLoading, isSuccess, isError, error } = useGetAttendanceQuery({ id });
  const [attendanceData, setAttendanecData] = useState({});

  useEffect(() => {
    if (isSuccess && getAttendance) {
      const formattedData = formatAttendanceData(getAttendance.data);
      setAttendanecData(formattedData);
    }
  }, [getAttendance]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    console.log("delete", id);
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
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        {/* Attendance */}
        {value === tabs[0].value && (
          <CardComponent
            title={"Attendance Information"}
            handleDelete={handleDelete}
          >
            <CardInformation data={attendanceData.attendance} />
          </CardComponent>
        )}
        {/* Student */}
        {value === tabs[1].value && (
          <CardComponent
            title={"Student Information"}
            imgUrl={attendanceData.studentImg}
          >
            <CardInformation data={attendanceData.student} />
          </CardComponent>
        )}
        {/* Teacher */}
        {value === tabs[2].value && (
          <CardComponent
            title={"Teacher Information"}
            imgUrl={attendanceData.studentImg}
          >
            <CardInformation data={attendanceData.teacher} />
          </CardComponent>
        )}
        {/* Guardian */}
        {value === tabs[3].value && (
          <CardComponent
            title={"Guardian Information"}
          >
            <CardInformation data={attendanceData.guardian} />
          </CardComponent>
        )}
      </FormComponent>
    </>
  );
}

export default AttendanceViewPage;

const tab = { whiteSpace: "normal", wordBreak: "break-word" };

