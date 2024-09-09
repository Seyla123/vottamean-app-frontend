import {
  Box,
  Tabs,
  Tab,

} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import CardInformation from "../../../components/common/CardInformation";

const StudentDetailPage = () => {
  const navigate = useNavigate();

  const handleUpdateStudent = (selectedPostId) => {
    navigate(`/dashboard/students/update/${selectedPostId}`);
  };
  const clickDetele = ()=>{
    console.log('delete');
    
  }
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
        <CardComponent title={"Student Information"}
               imgUrl='r'
                handleEdit={handleUpdateStudent}
                handleDelete={clickDetele}>
            
             <CardInformation  data={infoStudent}/>  
              
        </CardComponent>
           )}
        {activeTab === 1 && (
        <CardComponent title={"Guardian Information"}
                handleEdit={handleUpdateStudent}>
          <CardInformation data={infoGuadian} />
    
        </CardComponent>
                  )}
      </FormComponent>
    </>
  );
};

export default StudentDetailPage;


const infoStudent ={

    "Student ID":"ANB1000",
  '  Full Name':"Potato Fried",
    "Class":  "Classs 5",
    "Age": 18,
    "Gender": "Female",
    "Date of Birth": "01/01/2000",
    "Phone Number": "01234567",
    "Email":"mrpotato@123gmail.com",
    "Address":"Potatoes village, french fried city"
  
}
const infoGuadian = {

 " Guardian Name":"Potato Fried",
  "Relationship": "Father",
  "Email":"exampleusergmail.com",
  "Phone Number": "01234567"

}