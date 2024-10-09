// React and third-party libraries
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import { MenuItem, Box, Avatar, Typography, Select } from '@mui/material';
import dayjs from 'dayjs';
import { UserRoundPlus } from 'lucide-react';

// Custom Components
import DOBPicker from '../common/DOBPicker';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import SubHeader from '../teacher/SubHeader';

// Redux Hooks and APIs
import { useGetClassesDataQuery } from '../../services/classApi';
import { updateFormData } from '../../store/slices/studentSlice';

// Validator
import { StudentValidator } from '../../validators/validationSchemas';

const StudentForm = ({ handleNextClick, handleBack }) => {
  // Dispatch actions
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentForm || {});

  const [dob, setDob] = useState(
    studentData.dob ? dayjs(studentData.dob) : null,
  );
  const [rows, setRows] = useState([]);

  // Define form methods and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(StudentValidator),
    defaultValues: {
      first_name: studentData.first_name || '',
      last_name: studentData.last_name || '',
      class_id: studentData.class_id || '',
      gender: studentData.gender || '',
      phone_number: studentData.phone_number || '',
      address: studentData.address || '',
      dob: studentData.dob || null,
    },
  });

  useEffect(() => {
    if (studentData) {
      setValue('first_name', studentData.first_name || '');
      setValue('last_name', studentData.last_name || '');
      setValue('class_id', studentData.class_id || '');
      setValue('gender', studentData.gender || '');
      setValue('phone_number', studentData.phone_number || '');
      setValue('address', studentData.address || '');
      setDob(studentData.dob ? dayjs(studentData.dob) : null);
    }
  }, [studentData, setValue]);

  // Redux Class API
  const { data: classData } = useGetClassesDataQuery();

  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      const classes = classData.data.map((classItem) => ({
        value: classItem.class_id,
        label: classItem.class_name,
      }));
      setRows(classes);
    }
  }, [classData]);

  // Handle form submission
  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : '';
    const updatedData = { ...data, dob: formattedDob };

    dispatch(updateFormData(updatedData));
    handleNextClick(true, updatedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={profileBox}>
        <Box sx={profilePic}>
          <Avatar sx={imgStyle} alt="profile picture" src="r" />
        </Box>
        <SubHeader title={'Student Information'} />
        <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
          <InputField
            name="first_name"
            control={control}
            label="First Name"
            placeholder="First Name"
            errors={errors}
            icon={UserRoundPlus}
          />

          <InputField
            name="last_name"
            control={control}
            label="Last Name"
            placeholder="Last Name"
            errors={errors}
            icon={UserRoundPlus}
          />
        </Box>

        {/* Gender */}
        <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
          <GenderSelect
            control={control}
            errors={errors}
            name="gender"
            label="Gender"
            defaultValue={studentData.gender || ''}
          />
          {/* Date of Birth */}
          <DOBPicker
            control={control}
            errors={errors}
            name="dob"
            dob={dob}
            setDob={setDob}
          />
        </Box>

        {/* Class */}
        <Box sx={{ ...textFieldGap, width: '100%' }}>
          <Typography variant="body2" fontWeight="bold">
            Class <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="class_id"
            control={control}
            defaultValue={studentData.class_id || ''}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.class_id}
              >
                {rows.length > 0 ? (
                  rows.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Loading...
                  </MenuItem>
                )}
              </Select>
            )}
          />
        </Box>

        {/* Phone Number */}
        <Box sx={{ ...textFieldGap, width: '100%' }}>
          <PhoneInputField
            name="phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
          />
        </Box>

        {/* ADDRESS INPUT */}
        <InputField
          name="address"
          control={control}
          label="Street Address"
          placeholder="Phnom Penh, Street 210, ..."
          errors={errors}
          multiline
          minRows={5}
          required={false}
        />

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <StyledButton
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={handleBack}
          >
            Back
          </StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Continue
          </StyledButton>
        </Box>
      </Box>
    </form>
  );
};

export default StudentForm;

const profileBox = {
  width: '100%',
  bgcolor: '#ffffff',
  padding: {
    xs: 2,
    sm: 3,
  },
  gap: {
    xs: '12px',
    sm: 3,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};
const profilePic = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  position: 'relative',
};
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
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

// Styles
const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
