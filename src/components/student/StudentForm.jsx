import { useState } from 'react';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextFieldComponent from '../common/TextFieldComponent';
import SelectField from '../common/SelectField';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import userProfile from '../../assets/images/default-profile.png';
function StudentFrom() {
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    className: '',
    gender: '',
    dob: null,
    phoneNumber: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {/* container img */}
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
          onChange={handleInputChange}
          options={classOptions}
          placeholder={'select class'}
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
            onChange={handleInputChange}
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
        />
      </Box>
      {/* email */}
      <Box>
        <Typography variant="body2" fontWeight="bold">
          Email
          <span style={{ color: 'red', marginLeft: 1 }}>*</span>
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
        />
      </Box>
    </>
  );
}

export default StudentFrom;

const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
    sm: 160,
  },
  display: 'flex',
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];
const classOptions = [
  { value: 'Class A', label: 'Class A' },
  { value: 'Class B', label: 'Class B' },
];
