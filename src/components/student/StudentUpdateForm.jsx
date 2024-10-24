// StudentUpdateForm.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  MenuItem,
  Grid,
  Select,
  Stack,
  Typography,
  InputAdornment,
  FormControl,
} from '@mui/material';
import { ImagePlus, School, Trash2, UserRoundPen } from 'lucide-react';
import dayjs from 'dayjs';
import { StyledTextField } from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import { setSnackbar } from '../../store/slices/uiSlice';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import DOBPicker from '../common/DOBPicker';

import { useGetClassesDataQuery } from '../../services/classApi';
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../services/studentApi';

import { studentValidationSchema } from '../student/StudentForm';
import { formatStudentFormData } from '../../utils/formatData';
import { ensureOptionInList } from '../../utils/formatHelper';
import RandomAvatar from '../common/RandomAvatar';
import { useTheme } from '@emotion/react';
import SomethingWentWrong from '../common/SomethingWentWrong';

const StudentUpdateForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: studentData, isLoading, isError, error } = useGetStudentsByIdQuery(id);
  const { data: classData, isSuccess: isClassSuccess } = useGetClassesDataQuery(
    { active: 1 },
  );

  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [hasPhotoChanges, setHasPhotoChanges] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState('');

  const [updateStudent] = useUpdateStudentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: {
      photo: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      dob: null,
      address: '',
      class_id: '',
    },
  });

  useEffect(() => {
    if (studentData && classData && isClassSuccess) {
      console.log('studentData:', studentData);
      const formattedData = formatStudentFormData(studentData);

      const formattedClassData = ensureOptionInList(
        classData?.data,
        studentData?.data?.Class,
        'class_id',
        'class_name',
      );

      const studentInfo = {
        ...formattedData,
        dob: formattedData.dob
          ? dayjs(formattedData.dob).format('YYYY-MM-DD')
          : null,
      };

      setClasses(formattedClassData);
      reset(studentInfo);
      setDob(studentInfo.dob);
      setOriginalData(studentInfo);
    }
    // console.log('studentData:', studentData);
    console.log('classData:', classData);
    console.log('isClassSuccess:', isClassSuccess);
  }, [studentData, reset, classData, isClassSuccess]);

  const onSubmit = async (data) => {
    const submittedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      gender: data.gender,
      dob:
        data.dob && dayjs(data.dob).isValid()
          ? dayjs(data.dob).format('YYYY-MM-DD')
          : null,
      address: data.address,
      class_id: data.class_id,
    };

    const hasChanges = Object.keys(submittedData).some(
      (key) => submittedData[key] !== originalData[key],
    );

    if (!hasChanges && !hasPhotoChanges) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
      handleNext();
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(submittedData).forEach((key) =>
        formData.append(key, submittedData[key]),
      );

      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      const result = await updateStudent({ id, updates: formData }).unwrap();

      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Student information updated successfully!',
            severity: 'success',
            autoHideDuration: 6000,
          }),
        );
        handleNext();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: `Update failed: ${error.message}`,
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setValue('photo', file);
      setHasPhotoChanges(true);
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

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setProfileImg(null);
    setPreviewUrl(null);
    setValue('photo', null);
    setHasPhotoChanges(true); 
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />
  }

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: '8px',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        gutterBottom
        mb={4}
      >
        Edit Student Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction="row" gap={2} alignItems="center" py={3}>
            {previewUrl || profileImg ? (
              <Avatar
                src={previewUrl || profileImg}
                alt="Profile"
                sx={{ width: 140, height: 140 }}
              />
            ) : (
              <RandomAvatar size={140} />
            )}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              gap={2}
            >
              <label htmlFor="photo-upload">
                <StyledButton
                  variant="contained"
                  size="small"
                  component="span"
                  startIcon={<ImagePlus size={18} />}
                >
                  Upload
                </StyledButton>
              </label>
              <StyledButton
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Trash2 size={18} />}
                onClick={handleRemovePhoto}
              >
                Remove
              </StyledButton>
            </Box>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="first_name"
                control={control}
                label="First Name"
                placeholder="First Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="last_name"
                control={control}
                label="Last Name"
                placeholder="Last Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GenderSelect
                control={control}
                errors={errors}
                name="gender"
                label="Gender"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DOBPicker
                control={control}
                errors={errors}
                name="dob"
                dob={dob}
                setDob={setDob}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Class <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <Controller
                  name="class_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      select
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <School size={20} />
                          </InputAdornment>
                        ),
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return (
                              <span style={{ color: theme.palette.grey[400] }}>
                                Select Class
                              </span>
                            );
                          }
                          const selectedClass = classes.find(
                            (classes) => classes.class_id === selected,
                          );
                          return selectedClass ? selectedClass.class_name : '';
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select a class
                      </MenuItem>
                      {classes.length > 0 &&
                        classes.map((classItem) => (
                          <MenuItem
                            key={classItem.class_id}
                            value={classItem.class_id}
                          >
                            {classItem.class_name}
                          </MenuItem>
                        ))}
                    </StyledTextField>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <PhoneInputField
                name="phone_number"
                control={control}
                label="Contact Number"
                errors={errors}
                fullWidth
              />
            </Grid>
          </Grid>
          <InputField
            name="address"
            control={control}
            label="Street Address"
            placeholder="Phnom Penh, Street 210, ..."
            errors={errors}
            required={false}
            multiline
            minRows={5}
            fullWidth
          />
          <Stack direction={'row'} gap={1} justifyContent={'flex-end'}>
            <StyledButton
              variant="outlined"
              size="small"
              // onClick={handleCancel}
            >
              Cancel
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Continue
            </StyledButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default StudentUpdateForm;
