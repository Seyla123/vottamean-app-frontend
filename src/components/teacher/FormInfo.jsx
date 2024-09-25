import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TeacherInfo from './TeacherInfo';
import AccountInfo from './AccountInfo';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingCircle from '../../components/loading/LoadingCircle';

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({});

  // Add teacher API mutation
  const [signUpTeacher, { isLoading, isError, error, isSuccess }] =
    useSignUpTeacherMutation();

  // Effect to handle loading, success, and error states
  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Signing up...',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'An error occurred during signup',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            'Signup successful. Please check your email for verification.',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/teachers');
    }
  }, [dispatch, isLoading, isError, error, isSuccess]);

  // Handle form check for date of birth validation and submit data
  const handleAccountSubmit = async (data) => {
    const today = dayjs();
    const dob = dayjs(data.dob);
    // Check if date of birth is valid or is in the past
    if (!dob.isValid() || dob.isAfter(today)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Date of birth cannot be in the future',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
      return;
    }

    // Validate and format the date of birth
    const payload = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      address: data.address || '',
      dob: dob.format('YYYY-MM-DD'),
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      gender: data.gender || '',
      phone_number: data.phoneNumber || '',
    };
    // Call the API to sign up the teacher with the provided data
    try {
      await signUpTeacher(payload).unwrap();
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  // Handle next tab click to account information
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data);
      setValue('2');
      setIsTeacherInfoValid(true);
    }
  };

  // Navigate back to teacher information tab
  const handleBack = () => {
    setValue('1');
  };

  // loading and error states
  if (isLoading) return <LoadingCircle />;
  if (isError) return <p>Error loading teacher data.</p>;

  return (
    <Box>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label="TEACHER INFORMATION" value="1" />
        <Tab
          label="ACCOUNT INFORMATION"
          value="2"
          disabled={!isTeacherInfoValid}
        />
      </Tabs>

      {value === '1' && (
        <TeacherInfo
          handleNextClick={handleNextClick}
          defaultValues={teacherData}
        />
      )}
      {value === '2' && (
        <AccountInfo
          handleBack={handleBack}
          handleAccountSubmit={handleAccountSubmit}
          teacherData={teacherData}
        />
      )}
    </Box>
  );
}

export default FormInfo;
