import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from '../../services/teacherApi';
import {
  TextField,
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';
import SubHeader from './SubHeader';
import dayjs from 'dayjs';

const UpdateTeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the teacher data
  const { data: teacherData, isLoading, fetchError } = useGetTeacherQuery(id);
  const [profileImg, setProfileImg] = useState('');

  // State to hold initial form data for changes comparison
  const [initialFormData, setInitialFormData] = useState(null);

  // Initialize formData with empty strings and nulls
  // We use this state to store the updated teacher information
  // and then pass it to the updateTeacher mutation when the form is submitted
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    dob: null,
    address: '',
  });

  // Update the teacher information and show a snackbar status of updating teacher
  const [
    updateTeacher,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateTeacherMutation();

  // we want the form to be pre-filled with the existing information
  useEffect(() => {
    if (teacherData) {
      const { Info } = teacherData.data;
      const teacherInfo = {
        first_name: Info.first_name || '',
        last_name: Info.last_name || '',
        phone_number: Info.phone_number || '',
        gender: Info.gender || '',
        dob: Info.dob ? dayjs(Info.dob) : null,
        address: Info.address || '',
      };
      setFormData(teacherInfo);
      setInitialFormData(teacherInfo); 
      setProfileImg(Info.photo);
    }
  }, [teacherData]);

  // show the teacher update status in the snackbar
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
      navigate('/admin/teachers');
    }
  }, [dispatch, isUpdateError, isUpdateSuccess, isUpdating]);

  // Handle input changes with validation
  const handleInputChange = ({ target: { name, value } }) => {
    // Prevent numeric input for first_name and last_name
    if ((name === 'first_name' || name === 'last_name') && /\d/.test(value)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Names cannot contain numbers.',
          severity: 'error',
        }),
      );
      return;
    }
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Handle Date Change
  const handleDateChange = (date) => {
    setFormData((data) => ({ ...data, dob: date }));
  };
  // Handle Change Gender
  const handleGenderChange = (gender) => {
    const value = gender.target.value;
    setFormData((data) => ({ ...data, gender: value }));
    // Update the gender in the formData along with the input value
  };

  const validateForm = () => {
    const { phone_number, first_name, last_name, gender, dob, address } =
      formData;
    // Check if all fields are filled
    if (
      !first_name ||
      !last_name ||
      !phone_number ||
      !gender ||
      !dob ||
      !address
    ) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'All fields are required.',
          severity: 'error',
        }),
      );
      return false;
    }

    // Check if phone number is valid (9-15 digits)
    if (!/^\d{9,15}$/.test(phone_number)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Phone Number must be between 9 and 15 digits and numeric.',
          severity: 'error',
        }),
      );
      return false;
    }
    return true;
  };

  const isFormDataUnchanged = () => {
    return JSON.stringify(formData) === JSON.stringify(initialFormData);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    // validation failed
    if (!validateForm()) {
      return;
    }
    if (isFormDataUnchanged()) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/teachers');
    }
    try {
      await updateTeacher({
        id, // get the id of the teacher to update
        updates: {
          ...formData,
          dob: formData.dob ? formData.dob.format('YYYY-MM-DD') : null,
        },
      }).unwrap();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  // handle cancel back to list page
  const handleCancel = () => {
    navigate('/admin/teachers');
  };

  // loading and error states
  if (isLoading) return <LoadingCircle />;
  if (fetchError) return navigate('/admin/teachers');

  return (
    <Box sx={profileBox}>
      <Box sx={valueBoxOne}>
        <Avatar sx={imgStyle} alt="profile picture" src={profileImg} />
      </Box>
      <SubHeader title={'Teacher Information'} />
      <Box sx={boxContainer}>
        {/* Names */}
        <Stack spacing={2} direction={'row'}>
          <Box sx={textFieldGap} flex={1} width={'100%'}>
            <Typography>First Name</Typography>
            <TextField
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </Box>
          <Box sx={textFieldGap} flex={1} width={'100%'}>
            <Typography>Last Name</Typography>
            <TextField
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </Box>
        </Stack>
        {/* Gender */}
        <Box sx={textFieldGap}>
          <Typography>Gender</Typography>
          <Select
            value={formData.gender}
            onChange={handleGenderChange}
            renderValue={(selected) => {
              if (!selected) {
                return <Box sx={{ color: '#B5B5B5' }}>Select Gender</Box>;
              }
              return selected;
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Box>
        {/* Date of Birth */}
        <Box sx={textFieldGap}>
          <Typography>Date of Birth</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="dob"
              value={formData.dob}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {/* Phone Number */}
        <Box sx={textFieldGap}>
          <Typography>Contact Number</Typography>
          <TextField
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Contact Number"
          />
        </Box>
        {/* Address */}
        <Box sx={textFieldGap}>
          <Typography>Address</Typography>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            multiline
            minRows={2}
          />
        </Box>
        {/* Buttons */}
        <Stack sx={buttons}>
          <Button fullWidth variant="outlined" color="" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

// Styles
const profileBox = {
  border: '1px solid',
  borderColor: '#E0E0E0',
  borderRadius: '8px',
  bgcolor: '#ffffff',
  marginTop: '32px',
  padding: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
};
const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
    sm: 160,
  },
};
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};
const boxContainer = {
  width: '100%',
  marginY: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
const buttons = {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'flex-end',
  gap: 2,
  marginTop: 2,
  width: { xs: '100%', sm: '340px' },
};
export default UpdateTeacherForm;
