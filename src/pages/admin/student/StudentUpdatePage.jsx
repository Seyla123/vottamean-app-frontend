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
} from '@mui/material';
import userProfile from '../../../assets/images/default-profile.png';
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

const StudentUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [profileImg, setProfileImg] = useState('');
  const [rows, setRows] = useState([]);

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


  // onSubmitStudent : function forsubmit Student Form
  const onSubmitStudent = (e) => {
    e.preventDefault();
    if (activeTab === 0) {
      setActiveTab(1);
    }
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
      console.log(formData);
      console.log('Update Response:', response);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
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

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="STUDENT INFORMATION" />
        <Tab label="GUARDIAN INFORMATION" />
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeTab === 0 && (
          <StudentUpdateForm
            control={control}
            errors={errors}
            rows={rows}
            onChange={onSubmitStudent}
          />
        )}
        {activeTab === 1 && (
          <GuardianUpdateForm control={control} errors={errors} />
        )}
      </form>
    </Box>
  );
};

export default StudentUpdatePage;

const imgStyle = {
  width: { xs: 120, sm: 160 },
  height: { xs: 120, sm: 160 },
};

