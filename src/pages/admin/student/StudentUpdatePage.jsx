import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Tab, Stack, Tabs, Avatar } from '@mui/material';
import userProfile from '../../../assets/images/default-profile.png';
import SelectField from '../../../components/common/SelectField';
import TextFieldComponent from '../../../components/common/TextFieldComponent';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { useGetClassesDataQuery } from '../../../services/classApi';
import {useGetStudentsByIdQuery, useUpdateStudentsDataMutation } from '../../../services/studentApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { setSnackbar } from '../../../store/slices/uiSlice';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];
const StudentUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [profileImg, setProfileImg] = useState('');
  const [errors, setErrors] = useState({});

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    className: '',
    gender: '',
    dob: dayjs(),
    phoneNumber: '',
    email: '',
    address: '',
    guardianFirstName: '',
    guardianLastName: '',
    guardianRelationship: '',
    guardianEmail: '',
    guardianPhoneNumber: '',
  });
  const { data: studentData,isLoading,fetchError} = useGetStudentsByIdQuery(id);
  const [  updatedStudent, { isLoading: isUpdating, isError: isUpdateError,  isSuccess: isUpdateSuccess,  error: updateError }] = useUpdateStudentsDataMutation();
  // Filter class data for option Selection
  const { data: classData} = useGetClassesDataQuery();
  // State to hold initial form data for changes comparison
  const [initialFormData, setInitialFormData] = useState(null);
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
      const { Info,guardian_first_name ,guardian_last_name, guardian_email, guardian_relationship, guardian_phone_number, class_id } = studentData.data;
      const studentInfo = {
        firstName: Info.first_name || '',
        lastName: Info.last_name || '',
        phoneNumber: Info.phone_number || '',
        className: class_id || '',
        gender: Info.gender || '',
        dob: Info.dob ? dayjs(Info.dob) : null,
        address: Info.address || '',
        guardianLastName: guardian_last_name || '',
        guardianFirstName: guardian_first_name || '',
        guardianRelationship: guardian_relationship || '',
        guardianEmail: guardian_email || '',
        guardianPhoneNumber: guardian_phone_number || '',
      };
      setNewStudent(studentInfo);
      setInitialFormData(studentInfo);
      setProfileImg(Info.photo);
    }
  }, [studentData]);
  // Snackbar for showing Messages
  useEffect(() => {
    if (isUpdating) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updating...',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: updateError.message,
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    } else if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isUpdateError, isUpdateSuccess, isUpdating]);
  const handleInputChange = ({ target: { name, value } }) => {
    // Prevent numeric input for first_name and last_name
    if ((name === 'firstName' || name === 'lastName') && /\d/.test(value)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Names cannot contain numbers.',
          severity: 'error',
        }),
      );
      return;
    }
    setNewStudent((data) => ({ ...data, [name]: value }));
  };
//Handles  Gender Change
  const handleGenderChange = (event) => {
    setNewStudent((data) => ({ ...data, gender: event.target.value }));
  };
  //Handle Class Channge
  const handleClassChange = (event) => {
    setNewStudent((data) => ({ ...data, className: event.target.value }));
  };
  const validateForm = () => {
    const { phoneNumber, firstName, lastName, gender, className, dob, address, guardianFirstName, guardianLastName, guardianRelationship, guardianEmail, guardianPhoneNumber } = newStudent;
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required.';
    if (!lastName) newErrors.lastName = 'Last name is required.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!className) newErrors.className = 'Class is required.';
    if (!dob) newErrors.dob = 'Date of birth is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (!guardianFirstName) newErrors.guardianFirstName = 'Guardian first name is required.';
    if (!guardianLastName) newErrors.guardianLastName = 'Guardian last name is required.';
    if (!guardianRelationship) newErrors.guardianRelationship = 'Guardian relationship is required.';
    if (!guardianEmail) newErrors.guardianEmail = 'Guardian email is required.';
    if (!/^\d{9,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is require, must be between 9 and 15 digits and numeric.';
    }
    if (!/^\d{9,15}$/.test(guardianPhoneNumber)) {
      newErrors.guardianPhoneNumber = 'Guardian phone number must be between 9 and 15 digits and numeric.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  // isFormDataUnchanged: Use for testing if Data is changed
  const isFormDataUnchanged = () => {
    return JSON.stringify(newStudent) === JSON.stringify(initialFormData);
  };
// onSubmitStudent : function forsubmit Student Form 
  const onSubmitStudent = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (activeTab === 0) {
      setActiveTab(1);
    }
  };
  //onSubmit : Submit Data to Backend
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isFormDataUnchanged()) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    }
    if (!validateForm()) return;
    try {
      await updatedStudent({
        id,
        updates: {
          first_name: newStudent.firstName,
          last_name: newStudent.lastName,
          className: newStudent.className,
          gender: newStudent.gender,
          dob: newStudent.dob ? newStudent.dob.format('YYYY-MM-DD') : null,
          phone_number: newStudent.phoneNumber,
          address: newStudent.address,
          guardian_email: newStudent.guardianEmail,
          guardian_first_name: newStudent.guardianFirstName,
          guardian_last_name: newStudent.guardianLastName,
          guardian_phone_number: newStudent.guardianPhoneNumber,
          guardian_relationship: newStudent.guardianRelationship,
        },
      }).unwrap();
    } catch (error) {
      console.error('Update failed', error);
    }
  };
  if (isLoading) return <LoadingCircle />;
  if (fetchError) return navigate('/admin/students');
  return (
    <FormComponent title="Update Student" subTitle="Please fill Student Information" >
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="STUDENT INFORMATION" />
        <Tab label="GUARDIAN INFORMATION" />
      </Tabs>

      {activeTab === 0 && (
        <CardComponent title="Student Information">
          <Stack component={'div'} alignSelf={'center'}>
            <Avatar sx={imgStyle} alt="user profile" src={userProfile} />
          </Stack>
          <Stack direction={'row'} gap={1}>
            {/* first name */}
            <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
              <Typography variant="body2" fontWeight="bold">
                First Name
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <TextFieldComponent
                customStyle={{ flexGrow: 1 }}
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                placeholder={'first name'}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Box>
            {/* last name */}
            <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
              <Typography variant="body2" fontWeight="bold">
                Last Name
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <TextFieldComponent
                customStyle={{ flexGrow: 1 }}
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                placeholder={'last name'}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
          </Stack>
          <Box>
            {/* class */}
            <Typography variant="body2" fontWeight="bold">
              Class
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <SelectField
              name="className"
              value={newStudent.className}
              onChange={handleClassChange}
              options={rows}
              placeholder={'select class'}
              error={!!errors.className}
              helperText={errors.className}
            />
          </Box>
          <Stack direction={'row'} gap={1}>
            <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
              {/* gender */}
              <Typography variant="body2" fontWeight="bold">
                Gender
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <SelectField
                customStyle={{ width: '100%' }}
                name="gender"
                value={newStudent.gender}
                onChange={handleGenderChange}
                options={genderOptions}
                placeholder={'select gender'}
              />
            </Box>
            {/* dob */}
            <Box display="flex" flexDirection="column" gap="8px" width={'100%'}>
              <Typography variant="body2" fontWeight="bold">
                Date of Birth
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={newStudent.dob}
                  onChange={(date) =>
                    setNewStudent((prev) => ({ ...prev, dob: date }))
                  }
                  renderInput={(params) => <TextFieldComponent {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Stack>
          {/* phone number */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Phone Number
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextFieldComponent
              name="phoneNumber"
              value={newStudent.phoneNumber}
              onChange={handleInputChange}
              placeholder={'phone number'}
              error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
            />
          </Box>
          {/* email */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Email
            </Typography>
            <TextFieldComponent
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder={'email'}
            />
          </Box>
          {/* address */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Address
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextFieldComponent
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
              placeholder={'address'}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Box>
          <ButtonContainer
            leftBtn={() => navigate('/admin/students')}
            rightBtn={onSubmitStudent}
            leftBtnTitle="Cancel"
            rightBtnTitle="Update Student"
          />
        </CardComponent>
      )}
      {/*  Tab For Submissions All Data ( Guardian and Student) */}
      {activeTab === 1 && (
        <CardComponent title="Guardian Information">
              <Stack direction={'row'} gap={1}>
              {/* first name */}
              <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
                <Typography variant="body2" fontWeight="bold">
                  First Name
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <TextFieldComponent
                  customStyle={{ flexGrow: 1 }}
                  name="guardianFirstName"
                  value={newStudent.guardianFirstName}
                  onChange={handleInputChange}
                  placeholder={'first name'}
                  error={!!errors.guardianFirstName}
                  helperText={errors.guardianFirstName}
                />
              </Box>
              {/* last name */}
              <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
                <Typography variant="body2" fontWeight="bold">
                  Last Name
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <TextFieldComponent
                  customStyle={{ flexGrow: 1 }}
                  name="guardianLastName"
                  value={newStudent.guardianLastName}
                  onChange={handleInputChange}
                  placeholder={'last name'}
                  error={!!errors.guardianLastName}
                  helperText={errors.guardianLastName}
                />
              </Box>
            </Stack>
          {/* relationship */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Relationship
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextFieldComponent
              name="guardianRelationship"
              value={newStudent.guardianRelationship}
              onChange={handleInputChange}
              placeholder={'relationship'}
              error={!!errors.guardianRelationship}
              helperText={errors.guardianRelationship}
            />
          </Box>
          {/* email */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Email
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextFieldComponent
              name="guardianEmail"
              value={newStudent.guardianEmail}
              onChange={handleInputChange}
              placeholder={'email'}
            />
          </Box>
          {/* phone number */}
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Phone Number
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextFieldComponent
              name="guardianPhoneNumber"
              value={newStudent.guardianPhoneNumber}
              onChange={handleInputChange}
              placeholder={'phone number'}
              error={!!errors.guardianPhoneNumber}
              helperText={errors.guardianPhoneNumber}
            />
          </Box>
          <ButtonContainer
            leftBtn={() => setActiveTab(0)}
            rightBtn={onSubmit}
            leftBtnTitle="Previous"
            rightBtnTitle="Update Guardian"
          />
        </CardComponent>
      )}
    </FormComponent>
  );
};
export default StudentUpdatePage;
const imgStyle = {
  width: { xs: 120, sm: 160 },
  height: { xs: 120, sm: 160}
};
