import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Stack, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import {
  useGetStudentsByIdQuery,
  useDeleteStudentMutation,
} from '../../../services/studentApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../store/slices/formSlice';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { StudentProfile } from '../../../utils/formatData';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import { StyledTab } from '../../../components/common/StyledTabs';

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, snackbar } = useSelector((state) => state.ui);
  const [value, setValue] = useState('1');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Redux API call to get student details
  const { data: student, isLoading } = useGetStudentsByIdQuery(id);
  console.log('student : ', student?.data?.Info);

  const [
    deleteStudent,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error,
    },
  ] = useDeleteStudentMutation();

  // Local state for transformed student data
  const [studentData, setStudentData] = useState({
    studentProfile: {},
    guardianProfile: {},
    photo: '',
  });

  useEffect(() => {
    if (student) {
      console.log(student);
      const transformedData = StudentProfile(student.data);
      setStudentData(transformedData);
      console.log('Transformed Data:', transformedData);
      dispatch(updateFormData(transformedData));
      console.log(transformedData);
    }
  }, [student, dispatch]);

  // Handling tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdateStudent = () => {
    navigate(`/admin/students/update/${id}`);
  };

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message,
          severity: 'error',
        }),
      );
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  const clickDeleteStudent = () => {
    setSelectedStudent(id);
    dispatch(setModal({ open: true }));
  };

  // handle confirm deletion
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteStudent(selectedStudent.id).unwrap();
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading student data</Typography>;
  }

  return (
    <FormComponent
      title={'Student Detail'}
      subTitle={'Detailed student information'}
    >
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Student tabs">
            <StyledTab label="STUDENT INFORMATION" value="1" />
            <StyledTab label="GUARDIAN CONTACT" value="2" />
          </TabList>

          {/* Student Information Tab */}
          <TabPanel value="1" sx={{ px: 0, py: 2 }}>
            <Stack direction={'column'} gap={2}>
              <CardComponent
                title={'Student Information'}
                imgUrl={studentData.photo || '/path-to-default-image.png'}
                handleEdit={handleUpdateStudent}
                handleDelete={clickDeleteStudent}
              >
                <CardInformation data={studentData.studentProfile} />
              </CardComponent>
            </Stack>
            <DeleteConfirmationModal
              open={modal.open}
              onClose={() => dispatch(setModal({ open: false }))}
              onConfirm={handleDeleteConfirmed}
              itemName="Student"
            />
          </TabPanel>

          {/* Guardian Information Tab */}
          <TabPanel value="2" sx={{ px: 0, py: 2 }}>
            <Stack direction={'column'} gap={2}>
              <CardComponent
                title={'Guardian Information'}
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
