// - React and third-party libraries
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import SomthingWentWrong from '../common/SomthingWentWrong';
import LoadingCircle from '../loading/loadingCircle';

// - Material UI Components
import { MenuItem, Box, Typography, Select, Button } from '@mui/material';
import { UserRoundPen } from 'lucide-react';

// - Custom Components
import DOBPicker from '../common/DOBPicker';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import SubHeader from '../teacher/SubHeader';

// - Redux Slices and APIs
import { useGetClassesDataQuery } from '../../services/classApi';
import { updateFormData } from '../../store/slices/studentSlice';

// - Validation
import { StudentValidator } from '../../validators/validationSchemas';

import { useNavigate } from 'react-router-dom';

const StudentForm = ({ handleNext, handleFormChange }) => {
  // - Dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentData = useSelector((state) => state.student);

  // - API Class
  const {
    data: classData,
    isLoading: isClassDataLoading,
    error: classDataError,
  } = useGetClassesDataQuery();

  // - Local State
  const [dob, setDob] = useState(
    studentData.dob ? dayjs(studentData.dob) : null,
  );

  // - Class Rows State
  const [rows, setRows] = useState([]);
  const [isRowsLoading, setIsRowsLoading] = useState(true);

  // - Image Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // - Loading Class IDs
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

  // - Form Handlers
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(StudentValidator),
    defaultValues: {
      photo: studentData.photo || '',
      first_name: studentData.first_name || '',
      last_name: studentData.last_name || '',
      gender: studentData.gender || '',
      class_id: studentData.class_id ? String(studentData.class_id) : '',
      phone_number: studentData.phone_number || '',
      address: studentData.address || '',
      dob: studentData.dob || '',
    },
  });

  // - Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Invalid image file',
          severity: 'error',
        }),
      );
    }
  };

  // - Form Data Handlers tracking input changes
  useEffect(() => {
    if (studentData) {
      setValue('photo', studentData.photo || '');
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

  // - Handle form submission
  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : null;

    // - Create form data for submission
    const formData = new FormData();

    // - Append all fields from the data object to formData
    Object.entries({ ...data, dob: formattedDob }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // - Append the file separately if selected
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    // - Dispatch only serializable data to Redux
    const updatedData = {
      ...data,
      dob: formattedDob,
      photoUrl: previewUrl,
    };

    // - Update the form data in Redux
    dispatch(updateFormData(updatedData));
    handleFormChange(updatedData);

    // - Reset form
    reset();
    setSelectedFile(null);
    setPreviewUrl(null);
    handleNext();
  };

  // - Show loading circle while fetching class data
  if (isClassDataLoading || isRowsLoading) {
    return <LoadingCircle />;
  }

  // if there is an error fetching class data
  if (classDataError) {
    return <SomthingWentWrong customStyles={{minHeight: '70vh'}} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={profileBox}>
        <SubHeader title="Student Information" />

        {/* STUDENT PROFILE IMAGE UPLOAD */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <img
            src={previewUrl || studentData.photo || }
            alt="Profile"
            style={{ width: '120px', borderRadius: '50%' }}
          />
        </Box>

        {/* Photo Upload */}
        <input
          accept="image/*"
          type="file"
          id="photo-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="photo-upload">
          <Button variant="contained" component="span" fullWidth>
            Upload Photo
          </Button>
        </label>

        {/* STUDENT NAME */}
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

        {/* STUDENT GENDER AND DATE OF BIRTH */}
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

        {/* STUDENT CLASS */}
        <Box sx={{ ...textFieldGap, width: '100%' }}>
          <Typography variant="body2" fontWeight="bold">
            Class <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="class_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
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
                {/* Display error message */}
                {errors.class_id && (
                  <Typography variant="caption" color="error">
                    {errors.class_id.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Box>

        {/* CONTACT INFORMATION */}
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
          <StyledButton variant="outlined" color="inherit" size="large" onClick={()=> navigate('/admin/students')}>
            Cancel
          </StyledButton>
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
