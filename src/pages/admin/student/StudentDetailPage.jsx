import {Tabs, Tab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import CardInformation from "../../../components/common/CardInformation";
import { useGetStudentsByIdQuery } from "../../../services/studentApi";
import { useDispatch, useSelector } from "react-redux";
import { studentsData } from "../../../utils/formatData";

const StudentDetailPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetStudentsByIdQuery();

  useEffect(() => {
    if (isSuccess && data) {
      const formattedStudents = studentsData(data.data);
      setRows(formattedStudents);
    }
  }, [isSuccess, data,dispatch]);
  if (isError) {
    console.log('error message :', error.data.message);
  }

  const handleUpdateStudent = (selectedPostId) => {
    navigate(`/dashboard/students/update/${selectedPostId}`);
  };
  const clickDetele = () => {
    console.log("delete");
  };
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(0);
  const studentData = {
    "Student ID": `${data.Info.id}`,
    " Full Name": `${data.Info.name}`,
    Class: `${data.class_id}`,
    Age: `${data.Info.age}`,
    Gender: `${data.Info.gender}`,
    "Date of Birth": `${data.Info.date_of_birth}`,
    "Phone Number": `${data.Info.phone_number}`,
    Email: `${data.Info.email}`,
    Address: `${data.Info.address}`,
  };
  const infoGuadian = {
    " Guardian Name": "Potato Fried",
    Relationship: "Father",
    Email: "exampleusergmail.com",
    "Phone Number": "01234567",
  };
  

  return (
    <>
      <FormComponent
        title={"Student Detail"}
        subTitle={"There are  Students Indformation"}
      >
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="STUDENT INFORMATION" />
          <Tab label="GUARDIAN CONTACT" />
        </Tabs>
        {activeTab === 0 && (
          <CardComponent
            title={"Student Information"}
            imgUrl="r"
            handleEdit={handleUpdateStudent}
            handleDelete={clickDetele}
          >
            <CardInformation data={studentData} />
          </CardComponent>
        )}
        {activeTab === 1 && (
          <CardComponent
            title={"Guardian Information"}
            handleEdit={handleUpdateStudent}
          >
            <CardInformation data={infoGuadian} />
          </CardComponent>
        )}
      </FormComponent>
    </>
  );
};

export default StudentDetailPage;

