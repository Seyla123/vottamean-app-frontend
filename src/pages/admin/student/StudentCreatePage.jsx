import { useState } from "react";
import {
  Box,
  Tab,
  Tabs
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
import StudentFrom from "../../../components/student/StudentForm";
import GardianForm from "../../../components/student/GardianForm";
const StudentCreatePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleCancel = () => {
    if (activeTab === 0) {
      navigate("/admin/students");
    } else if (activeTab === 1) {
      setActiveTab(0);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      setActiveTab(1);
    } else {
      navigate("/admin/students");
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  return (
    <FormComponent title="Add Student" subTitle="Please Fill Student information">
      {/* Tab  */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="tabs example"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Student Information" />
            <Tab label="Guardian Information" />
          </Tabs>
      <CardComponent title={activeTab===0 ? "Student Information" : "Guardian Information"}>
        
          {/* stundet tab */}
          {activeTab === 0 && (
           <StudentFrom/>
          )}
          {/* guardian tab */}
          {activeTab === 1 && (
            <GardianForm/>
          )}
      
        {/* buttons container */}
        <ButtonContainer
          rightBtn={handleNext}
          leftBtn={handleCancel}
          leftBtnTitle="Cancel"
          rightBtnTitle={activeTab === 0 ? "Next" : "Submit"}
        />
      </CardComponent>
    </FormComponent>
  );
};

export default StudentCreatePage;
