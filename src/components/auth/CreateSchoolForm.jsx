// React and third-party libraries
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';

// Material UI components
import { Box, CircularProgress } from '@mui/material';
import { School } from 'lucide-react';

// Custom components
import StyledButton from '../common/StyledMuiButton';
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';

import { useSignupMutation } from '../../services/authApi';
import { RegisterSchoolValidator } from '../../validators/validationSchemas';

const CreateSchoolForm = ({ handleBack, handleFormChange }) => {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [signup, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchoolValidator),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('school_name', formData.school_name);
      setValue('school_phone_number', formData.school_phone_number);
      setValue('school_address', formData.school_address);
    }
    console.log('Form Data to backend :', formData);
  }, [formData, setValue]);

  useEffect(() => {
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'error',
          message: error.data.message,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'success',
          message:
            'Your account has been successfully created. Please verify your email.',
        }),
      );
    }
  }, [isError, isSuccess, dispatch, error]);

  const handleFormSubmit = async (data) => {
    const formattedData = {
      ...formData,
      school_name: data.school_name,
      school_phone_number: data.school_phone_number,
      school_address: data.school_address,
    };
    handleFormChange(formattedData);
    await signup(formattedData).unwrap();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
      }}
    >
      <HeaderTitle
        title={'Create Your Own School'}
        subTitle={
          'Choose a unique name that reflects the identity of your institution.'
        }
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* SCHOOL NAME INPUT */}
          <InputField
            name="school_name"
            control={control}
            label="School Name"
            placeholder="Enter your school name"
            errors={errors}
            icon={School}
          />

          {/* SCHOOL CONTACT NUMBER INPUT WITH COUNTRY CODE */}
          <PhoneInputField
            name="school_phone_number"
            control={control}
            label="School Contact"
            errors={errors}
          />

          {/* SCHOOL ADDRESS INPUT */}
          <InputField
            name="school_address"
            control={control}
            label="Street Address"
            placeholder="Phnom Penh, Street 210, ..."
            errors={errors}
            multiline
            minRows={5}
            required={false}
          />

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
            {/* Submit Button */}
            <StyledButton
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </StyledButton>
          </Box>

          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default CreateSchoolForm;
