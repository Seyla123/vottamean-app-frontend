import { useState, useEffect } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import { Box, Stack, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import CardInformation from "../../../components/common/CardInformation";
import { useGetStudentsByIdQuery } from "../../../services/studentApi";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../../store/slices/formSlice";
import { studentsData } from "../../../utils/formatData";
import { StudentProfile } from "../../../utils/formatData";

const StudentDetailPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  // Redux API call to get student details
  const { data: student, isLoading, error } = useGetStudentsByIdQuery(id);

  // Local state for transformed student data
  const [studentData, setStudentData] = useState({
    studentProfile:{},
    guardianProfile:{},
    img: "",
  });

  useEffect(() => {
    if (student ) {
      console.log(student)
      const transformedData = StudentProfile(student.data);
      setStudentData(transformedData); // Store transformed data locally
      dispatch(updateFormData(transformedData)); // Dispatch to form state
      console.log(transformedData);
    }
  }, [student, dispatch]);

  // Handling tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdateStudent = () => {
    navigate(`/dashboard/students/update/${student?.data?.id}`);
  };

  const clickDeleteStudent = () => {
    console.log("Deleting student...");
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading student data</Typography>;
  }


  return (
    <FormComponent title={"Student Detail"} subTitle={"Detailed student information"}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Student tabs">
            <Tab label="STUDENT INFORMATION" value="1" />
            <Tab label="GUARDIAN CONTACT" value="2" />
          </TabList>

          {/* Student Information Tab */}
          <TabPanel value="1" sx={{ px: 0, py: 2 }}>
            <Stack direction={"column"} gap={2}>
              <CardComponent
                title={"Student Information"}
                imgUrl={studentData.img || "/path-to-default-image.png"}
                handleEdit={handleUpdateStudent}
                handleDelete={clickDeleteStudent}
              >
                 <CardInformation data={studentData.studentProfile} />
              </CardComponent>
            </Stack>
          </TabPanel>

          {/* Guardian Information Tab */}
          <TabPanel value="2" sx={{ px: 0, py: 2 }}>
            <Stack direction={"column"} gap={2}>
              <CardComponent
                title={"Guardian Information"}
                handleEdit={handleUpdateStudent}
              >
                <CardInformation data={studentData.guardianProfile} />
              </CardComponent>
            </Stack>
          </TabPanel>
        </TabContext>
      </Box>
    </FormComponent>
  );
};

export default StudentDetailPage;
