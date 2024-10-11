import React from 'react';
import { Box, Stack, TextField } from '@mui/material';
import { UserRoundPen } from 'lucide-react';
import { Controller } from 'react-hook-form';
import StyledButton from '../common/StyledMuiButton';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';

const GuardianUpdateForm = ({ control, errors }) => {
  return (
    <Stack spacing={3}>
      {/* Guardian First Name */}
      <Box display="flex" flexDirection="row" sx={boxContainer}>
          <InputField
            name="guardian_first_name"
            control={control}
            label="First Name"
            placeholder="First Name"
            errors={errors}
            icon={UserRoundPen}
          />
          <InputField
            name="guardian_last_name"
            control={control}
            label="Last Name"
            placeholder="Last Name"
            errors={errors}
            icon={UserRoundPen}
          />
        </Box>

      {/* Guardian Email */}
      <Controller
        name="guardian_email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Guardian Email"
            {...field}
            error={!!errors.guardian_email}
            helperText={errors.guardian_email?.message}
            fullWidth
          />
        )}
      />

      {/* Guardian Phone Number */}
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
      <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <StyledButton variant="outlined" color="inherit" size="large">
            Cancel
          </StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Add
          </StyledButton>
        </Box>
    </Stack>
  );
};

export default GuardianUpdateForm;
const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
