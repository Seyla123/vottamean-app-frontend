// - React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// - Material UI components
import { Box, Button, Grid, Stack } from '@mui/material';

// - Material UI and Lucid Icons
import { Mail, UserRoundPen } from 'lucide-react';
import Diversity1Icon from '@mui/icons-material/Diversity1';

// - Custom components
import SubHeader from '../teacher/SubHeader';
import InputField from '../common/InputField';
import PhoneInputField from '../common/PhoneInputField';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { GuardianValidator } from '../../validators/validationSchemas';

// - Redux Slices
import { setSnackbar } from '../../store/slices/uiSlice';
// import { resetFormData } from '../../store/slices/studentSlice';

// - Student API
import { useCreateStudentMutation } from '../../services/studentApi';
import StyledButton from '../common/StyledMuiButton';
import dayjs from 'dayjs';

const GuardianForm = ({
  handleFormChange,
  handleBack,
  handleSubmitForm,
  studentData,
}) => {
  // - Dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const studentData = useSelector((state) => state.student);

  // - Create Student API
  const [createStudent, { isLoading, isError, error, isSuccess }] =
    useCreateStudentMutation();
  const [showPassword, setShowPassword] = useState(false);

  // yup validation from account information schema
  const {
    register,
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

  // Form submit function
  const onSubmit = async (data) => {
    console.log('on submit on guardian:',data);
    const formData = new FormData();

    // Create an object with the form data
    const formFields = {
      guardianFirstName: data.guardianFirstName,  
      guardianLastName: data.guardianLastName,    
      guardianRelationship: data.guardianRelationship,
      guardianPhoneNumber: data.guardianPhoneNumber,
      guardianEmail: data.guardianEmail,
      class_id: studentData.classId,
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
    try {
      await handleSubmitForm(formData);
    } catch (error) {
      console.error('Failed to sign up teacher:', error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Guardian Name Inputs */}
        <Stack direction={'column'} gap={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardianFirstName"
                control={control}
                label="Guardian First Name"
                placeholder="Guardian First Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardianLastName"
                control={control}
                label="Guardian Last Name"
                placeholder="Guardian Last Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
          </Grid>
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
          />
          {/* Guardian Relationship */}
          <InputField
            name="guardianRelationship"
            control={control}
            label="Relationship"
            placeholder="Relationship"
            errors={errors}
            icon={Diversity1Icon}
            required={false}
          />

          {/* Action Buttons */}
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <StyledButton onClick={handleBack} variant="outlined" size="small">
              Back
            </StyledButton>
            <StyledButton variant="contained" type="submit" size="small">
              Add Student
            </StyledButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default GuardianForm;
