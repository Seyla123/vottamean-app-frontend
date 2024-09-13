import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';
import schoolIcon from '../../assets/icon/schoolIcon.png';

// Yup validation schema
const schema = yup.object().shape({
  schoolName: yup.string().required('School name is required'),
  schoolPhone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must be digits only'),
  schoolAddress: yup.string().required('School Address is required'),
});

const RegisterSchoolForm = ({ onClickBack, onFormChange }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('schoolName', formData.school_name);
      setValue('schoolPhone', formData.school_phone_number);
      setValue('schoolAddress', formData.school_address);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    const formattedData = {
      ...formData,
      school_name: data.schoolName,
      school_phone_number: data.schoolPhone,
      school_address: data.schoolAddress,
    };

    dispatch(updateFormData(formattedData)); // Update Redux with form data

    if (onFormChange) {
      // Ensure onFormChange exists before calling it
      onFormChange(formattedData);
    }
  };

  return (
    <Box sx={containerStyles}>
      <GoBackButton handleOnClick={onClickBack} />
      <HeaderTitle
        title="Introduce Your School to WaveTrack"
        subTitle="Provide the information to begin your journey."
        center
      >
        <Box
          component="img"
          src={schoolIcon}
          sx={{ display: 'flex', alignSelf: 'center', maxWidth: '100px' }}
        />
      </HeaderTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School&apos;s Name</Typography>
            <TextField
              placeholder="School's name"
              {...register('schoolName')}
              error={!!errors.schoolName}
              helperText={errors.schoolName?.message}
            />
          </Box>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School Phone Number</Typography>
            <TextField
              placeholder="School Phone number"
              {...register('schoolPhone')}
              error={!!errors.schoolPhone}
              helperText={errors.schoolPhone?.message}
            />
          </Box>
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School Address</Typography>
            <TextField
              multiline
              minRows={5}
              placeholder="Phnom Penh, Street 210, ..."
              {...register('schoolAddress')}
              error={!!errors.schoolAddress}
              helperText={errors.schoolAddress?.message}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterSchoolForm;

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
};

const inputContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};
