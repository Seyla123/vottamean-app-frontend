// - React and third-party libraries
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// - Material UI components
import { Grid, Stack, Typography } from '@mui/material';

// - Material UI and Lucid Icons
import { Mail, UserRoundPen } from 'lucide-react';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import dayjs from 'dayjs';

// - Custom components
import InputField from '../common/InputField';
import PhoneInputField from '../common/PhoneInputField';
import { GuardianValidator } from '../../validators/validationSchemas';
import StyledButton from '../common/StyledMuiButton';

const GuardianForm = ({
  isLoading,
  handleBack,
  handleSubmitForm,
  studentData,
}) => {
  // yup validation from account information schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(GuardianValidator),
    defaultValues: {
      guardianFirstName: '',
      guardianLastName: '',
      guardianRelationship: '',
      guardianEmail: '',
      guardianPhoneNumber: '',
    },
  });

  // Form submission function
  const onSubmit = async (data) => {
    // Create form data
    const formData = new FormData();
    // Create an object with the form data
    const formFields = {
      guardian_first_name: data.guardianFirstName,
      guardian_last_name: data.guardianLastName,
      guardian_relationship: data.guardianRelationship,
      guardian_phone_number: data.guardianPhoneNumber,
      guardian_email: data.guardianEmail,
      class_id: Number(studentData.class_id), // Converting to number
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      dob: dayjs(studentData.dob).format('YYYY-MM-DD'),
      gender: studentData.gender,
      phone_number: studentData.phoneNumber,
      address: studentData.address || '',
    };

    // Append fields to FormData
    Object.entries(formFields).forEach(([key, value]) =>
      formData.append(key, value),
    );

    // Append the photo if it exists
    if (studentData.photo) {
      formData.append('photo', studentData.photo);
    }
    // Direct file append to FormData
    try {
      await handleSubmitForm(formData);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Guardian Name Inputs */}
      <Typography
        alignSelf={'start'}
        variant="h6"
        component="h2"
        fontWeight={'bold'}
        mb={4}
      >
        Guardian Information
      </Typography>
      <Stack direction={'column'} spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <InputField
            name="guardianFirstName"
            control={control}
            label="Guardian First Name"
            placeholder="First Name"
            errors={errors}
            icon={UserRoundPen}
            required={true}
          />

          <InputField
            name="guardianLastName"
            control={control}
            label="Guardian Last Name"
            placeholder="Last Name"
            errors={errors}
            icon={UserRoundPen}
            required={true}
          />
        </Stack>
        {/* GUARDIAN CONTACT INFORMATION */}
        {/* Guardian Phone Number */}
        <PhoneInputField
          name="guardianPhoneNumber"
          control={control}
          label="Contact Number"
          errors={errors}
        />

        {/* Guardian Email */}
        <InputField
          name="guardianEmail"
          control={control}
          label="Email"
          placeholder="Enter guardian email"
          errors={errors}
          icon={Mail}
          required={true}
        />

        {/* Guardian Relationship */}
        <InputField
          name="guardianRelationship"
          control={control}
          label="Relationship"
          placeholder="Relationship"
          errors={errors}
          icon={Diversity1Icon}
          required={true}
        />

        {/* Action Buttons */}
        <Stack
          direction={'row'}
          alignSelf={'flex-end'}
          justifyContent={'flex-end'}
          width={{ xs: '100%', sm: '300px', md: '260px' }}
          gap={2}
          marginTop={{ xs: 2, sm: 0 }}
        >
          <StyledButton
            onClick={handleBack}
            fullWidth
            variant="outlined"
            color="inherit"
            size="small"
          >
            Back
          </StyledButton>
          <StyledButton
            fullWidth
            variant="contained"
            type="submit"
            size="small"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </StyledButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default GuardianForm;
