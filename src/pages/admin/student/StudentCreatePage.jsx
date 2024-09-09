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
      navigate("/dashboard/students");
    } else if (activeTab === 1) {
      setActiveTab(0);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      setActiveTab(1);
    } else {
      navigate("/dashboard/students");
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
      <CardComponent title="Student Information">
        <Box
          component="form"
          sx={containerStyle}
        >
          {/* stundet tab */}
          {activeTab === 0 && (
           <StudentFrom/>
          )}
          {/* guardian tab */}
          {activeTab === 1 && (
            <GardianForm/>
          )}
        </Box>
        {/* buttons container */}
        <ButtonContainer
          leftBtn={handleCancel}
          rightBtn={handleNext}
          leftBtnTitle="Cancel"
          rightBtnTitle={activeTab === 0 ? "Next" : "Add Student"}
        />
      </CardComponent>
    </FormComponent>
  );
};

export default StudentCreatePage;
const containerStyle = {
  display: "grid",
  gap: { xs: "12px", md: "24px" },
  gridTemplateColumns: {
    xs: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
  },
}
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const classOptions = [
  { value: "Class A", label: "Class A" },
  { value: "Class B", label: "Class B" },
];
