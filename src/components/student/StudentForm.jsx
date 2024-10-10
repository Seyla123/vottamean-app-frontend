import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { MenuItem, Box, Typography, Select } from '@mui/material';
import { UserRoundPen } from 'lucide-react';

import DOBPicker from '../common/DOBPicker';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import SubHeader from '../teacher/SubHeader';

import { useGetClassesDataQuery } from '../../services/classApi';
import { updateFormData } from '../../store/slices/studentSlice';

import { StudentValidator } from '../../validators/validationSchemas';

const StudentForm = ({ handleNext, handleFormChange }) => {
  const studentData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const {
    data: classData,
    isLoading: isClassDataLoading,
    error: classDataError,
  } = useGetClassesDataQuery();

  const [dob, setDob] = useState(
    studentData.dob ? dayjs(studentData.dob) : null,
  );
  const [rows, setRows] = useState([]);
  const [isRowsLoading, setIsRowsLoading] = useState(true);

  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      setRows(
        classData.data.map((classItem) => ({
          value: String(classItem.class_id),
          label: classItem.class_name,
        })),
      );
      setIsRowsLoading(false);
    }
  }, [classData]);

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
      gender: studentData.gender || '',
      class_id: studentData.class_id ? String(studentData.class_id) : '',
      phone_number: studentData.phone_number || '',
      address: studentData.address || '',
      dob: studentData.dob || '',
    },
  });

  useEffect(() => {
    if (studentData) {
      setValue('first_name', studentData.first_name || '');
      setValue('last_name', studentData.last_name || '');
      setValue('gender', studentData.gender || '');
      const classId = String(studentData.class_id);
      const isClassIdValid = rows.some((row) => row.value === classId);
      setValue('class_id', isClassIdValid ? classId : '');
      setValue('phone_number', studentData.phone_number || '');
      setValue('address', studentData.address || '');
      setDob(studentData.dob ? dayjs(studentData.dob) : null);
    }
  }, [studentData, setValue, rows]);

  // Handle form submission
  const onSubmit = (data) => {
    // Ensure DOB is formatted correctly before submitting
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : null;

    // Add the formatted DOB to the form data
    const updatedData = {
      ...data,
      dob: formattedDob, // Ensure dob is always in YYYY-MM-DD format
    };

    // Dispatch and move to the next step
    dispatch(updateFormData(updatedData));
    handleFormChange(updatedData);
    handleNext();
  };

  if (isClassDataLoading || isRowsLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (classDataError) {
    return <Typography color="error">Failed to load classes.</Typography>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={profileBox}>
        <SubHeader title="Student Information" />

        <Box display="flex" flexDirection="row" sx={boxContainer}>
          <InputField
            name="first_name"
            control={control}
            label="First Name"
            placeholder="First Name"
            errors={errors}
            icon={UserRoundPen}
          />
          <InputField
            name="last_name"
            control={control}
            label="Last Name"
            placeholder="Last Name"
            errors={errors}
            icon={UserRoundPen}
          />
        </Box>

        <Box display="flex" flexDirection="row" sx={boxContainer}>
          <GenderSelect
            control={control}
            errors={errors}
            name="gender"
            label="Gender"
            defaultValue={studentData.gender || ''}
          />
          <DOBPicker
            control={control}
            errors={errors}
            name="dob"
            dob={dob}
            setDob={setDob}
          />
        </Box>

        <Box sx={{ ...textFieldGap, width: '100%' }}>
          <Typography variant="body2" fontWeight="bold">
            Class <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="class_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || ''}
                onChange={(e) => setValue('class_id', e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Class
                </MenuItem>
                {rows.length > 0 ? (
                  rows.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No Class Available
                  </MenuItem>
                )}
              </Select>
            )}
          />
          {errors.class_id && (
            <Typography color="error" variant="caption">
              {errors.class_id.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ ...textFieldGap, width: '100%' }}>
          <PhoneInputField
            name="phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
          />
          <InputField
            name="address"
            control={control}
            label="Street Address"
            placeholder="Phnom Penh, Street 210, ..."
            errors={errors}
            required={false}
            multiline
            minRows={5}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Continue
          </StyledButton>
        </Box>
      </Box>
    </form>
  );
};

export default StudentForm;

// Styles
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
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};
const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
