import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Tab,
  Stack,
  Tabs,
  Avatar,
  Button,
  CircularProgress,
  Typography,
  Card,
  Stepper,
  StepLabel,
  Step,
  useMediaQuery,
} from '@mui/material';
import { shadow } from '../../../styles/global';
import { useGetClassesDataQuery } from '../../../services/classApi';
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../../services/studentApi';
import { setSnackbar } from '../../../store/slices/uiSlice';
import StudentUpdateForm from '../../../components/student/StudentUpdateForm';
import GuardianUpdateForm from '../../../components/student/GuardianUpdateForm';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateStudentValidator } from '../../../validators/validationSchemas'; // Adjust the path as necessary
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { KeyRound, User } from 'lucide-react';
import { useTheme } from '@emotion/react';



const StudentUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [profileImg, setProfileImg] = useState('');
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Setup react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateStudentValidator),
    defaultValues: {
      photo: '',
      first_name: '',
      last_name: '',
      dob: '',
      gender: '',
      phone_number: '',
      address: '',
      class_id: '',
      guardian_first_name: '',
      guardian_last_name: '',
      guardian_email: '',
      guardian_relationship: '',
      guardian_phone_number: '',
    },
  });

  const {
    data: studentData,
    isLoading,
    fetchError,
  } = useGetStudentsByIdQuery(id);
  const [
    updateStudent,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error,
    },
  ] = useUpdateStudentMutation();
  const { data: classData } = useGetClassesDataQuery();

  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      const classes = classData.data.map((classItem) => ({
        value: classItem.class_name,
        label: classItem.class_name,
      }));
      setRows(classes);
    }
  }, [classData]);

  useEffect(() => {
    if (studentData) {
      const {
        Info,
        guardian_first_name,
        guardian_last_name,
        guardian_email,
        guardian_relationship,
        guardian_phone_number,
        class_id,
      } = studentData.data;
      reset({
        first_name: Info.first_name || '',
        last_name: Info.last_name || '',
        phone_number: Info.phone_number || '',
        class_id: class_id || '',
        gender: Info.gender || '',
        dob: Info.dob ? dayjs(Info.dob).format('YYYY-MM-DD') : '',
        address: Info.address || '',
        guardian_first_name: guardian_first_name || '',
        guardian_last_name: guardian_last_name || '',
        guardian_relationship: guardian_relationship || '',
        guardian_email: guardian_email || '',
        guardian_phone_number: guardian_phone_number || '',
      });
      setProfileImg(Info.photo);
    }
  }, [studentData, reset]);

    // Function to go to the next step
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
 
  // Function to go to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.photo) {
      formData.append('photo', data.photo);
    }
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      await updateStudent({ id, updates: formData }).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
      handleNext();

    // You can navigate to another page after all steps are done
    if (activeStep === steps.length - 1) {
      navigate('/admin/students');
    }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update failed',
          severity: 'error',
        }),
      );
    }
  };

  useEffect(() => {
    if (isUpdateLoading) {
      dispatch(
        setSnackbar({ open: true, message: 'Updating...', severity: 'info' }),
      );
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'Update failed',
          severity: 'error',
        }),
      );
    } else if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    error,
    dispatch,
    navigate,
  ]);

  if (isLoading) return <CircularProgress />;
  if (fetchError) return navigate('/admin/students');
  // Array of steps to display in the stepper
  const steps = [
    {
      label: 'Student',
      description: 'Enter student details',
      icon: <User size={24} />,
    },
    {
      label: 'Guardian',
      description: 'Enter guardian details',
      icon: <KeyRound size={24} />,
    },
  ];

  const CustomIconBox = ({ icon }) => (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#fff',
        padding: '8px',
      }}
    >
      {icon}
    </Box>
  );
  // Array of components to render in each step
  const stepFormComponents = [
    <StudentUpdateForm
      handleNext={handleNext}
      handleFormChange={onSubmit}
      control={control}
      errors={errors}
      rows={rows}
    />,
    <GuardianUpdateForm
      control={control}
      errors={errors}
      handleBack={handleBack}
      handleFormChange={onSubmit}
    />,
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 3 },
          height: '100%',
        }}
      >
        <Card sx={cardContainer}>
          {/* Sidebar with stepper */}
          <Box
            sx={{
              width: { xs: '100%', sm: '250px' },
              borderRight: { sm: '1px solid #e0e0e0' },
              p: 2,
            }}
          >
            <Stepper
              activeStep={activeStep}
              orientation={isMobile ? 'horizontal' : 'vertical'}
              sx={{ mt: 2 }}
            >
              {steps.map((step, index) => (
                <Step
                  key={index}
                  sx={{
                    opacity: activeStep === index ? 1 : 0.5,
                    transition: 'opacity 0.3s cubic-bezier(0.45, 0, 0.55, 1)',
                  }}
                >
                  <StepLabel
                    icon={<CustomIconBox icon={step.icon} />}
                    optional={
                      <Typography variant="body2" color="grey.300">
                        {step.description}
                      </Typography>
                    }
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Form components */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              backgroundColor: '#ffffff',
              overflowY: 'auto',
            }}
          >
            {/* Render the form component based on the active step */}
            {stepFormComponents[activeStep]}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default StudentUpdatePage;

const imgStyle = {
  width: { xs: 120, sm: 160 },
  height: { xs: 120, sm: 160 },
};

// Styles
const cardContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  height: '100%',
  borderRadius: 1,
  overflow: 'hidden',
  ...shadow,
};
