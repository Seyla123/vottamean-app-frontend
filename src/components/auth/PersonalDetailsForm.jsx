import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// Material UI Components
import { Box } from '@mui/material';

// Lucid Icons
import { UserRoundPlus, Calendar } from 'lucide-react';

// Custom Component
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import DOBPicker from '../common/DOBPicker';
import StyledButton from '../common/StyledMuiButton';

// Validator
import { PersonalInformationValidator } from '../../validators/validationSchemas';

const PersonalDetailsForm = ({ handleNext, handleBack, handleFormChange }) => {
  const formData = useSelector((state) => state.form);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PersonalInformationValidator),
    defaultValues: formData,
  });

  const [dob, setDob] = useState(formData.dob ? dayjs(formData.dob) : null);

  useEffect(() => {
    if (formData) {
      setValue('first_name', formData.first_name);
      setValue('last_name', formData.last_name);
      setValue('gender', formData.gender);
      setDob(formData.dob ? dayjs(formData.dob) : null);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : '';
    const updatedData = {
      ...data,
      dob: formattedDob,
    };
    handleFormChange(updatedData);
    handleNext();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
      }}
    >
      <HeaderTitle
        title={'Personal Details'}
        subTitle={
          'Please provide your personal information. This information will help us personalize your experience.'
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              gap: 2,
            }}
          >
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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              gap: 2,
            }}
          >
            <GenderSelect
              control={control}
              errors={errors}
              name="gender"
              label="Gender"
              defaultValue={formData.gender}
            />

            <DOBPicker
              control={control}
              errors={errors}
              name="dob"
              dob={dob}
              setDob={setDob}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <StyledButton
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              onClick={handleBack}
            >
              Back
            </StyledButton>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
            >
              Continue
            </StyledButton>
          </Box>
          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default PersonalDetailsForm;
