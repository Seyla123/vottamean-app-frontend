import { useState,useEffect } from "react";
import {Tabs, Tab } from "@mui/material";
import { useParams ,useNavigate} from "react-router-dom";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import CardInformation from "../../../components/common/CardInformation";
import { useGetStudentsByIdQuery } from "../../../services/studentApi";
import { studentsData } from '../../../utils/formatData';
import { useDispatch} from "react-redux";

const StudentDetailPage = () => {
  const {id} =useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const { data , isSuccess}  = useGetStudentsByIdQuery(id);
console.log(data);

 // Only call `setRows` if the student data is successfully fetched
 useEffect(() => {
  if (isSuccess && data && Array.isArray(data.students)) { 
    const formattedStudents = studentsData(data.students);
    setRows(formattedStudents);
  } 
}, [isSuccess, data]);


  const handleUpdateStudent = (selectedPostId) => {
    navigate(`/admin/students/update/${selectedPostId}`);
  };
  const clickDetele = () => {
    console.log("delete");
  };
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(0);

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
            <CardInformation data={rows} />
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

 const infoStudent = [
  { id: 'id', label: 'Student ID' },
  { id: 'name', label: ' Full Name' },
  { id: 'class', label: 'Class' },
  { id: 'age', label: 'Age' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
 ];

const infoGuadian = {
  " Guardian Name": "Potato Fried",
  Relationship: "Father",
  Email: "exampleusergmail.com",
  "Phone Number": "01234567",
};
