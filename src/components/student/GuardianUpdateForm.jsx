import React from 'react';
import { Box, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const GuardianUpdateForm = ({ control, errors }) => {
  return (
    <Stack spacing={3}>
      {/* Guardian First Name */}
      <Controller
        name="guardian_first_name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Guardian First Name"
            {...field}
            error={!!errors.guardian_first_name}
            helperText={errors.guardian_first_name?.message}
            fullWidth
          />
        )}
      />

      {/* Guardian Last Name */}
      <Controller
        name="guardian_last_name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Guardian Last Name"
            {...field}
            error={!!errors.guardian_last_name}
            helperText={errors.guardian_last_name?.message}
            fullWidth
          />
        )}
      />

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
      <Controller
        name="guardian_phone_number"
        control={control}
        render={({ field }) => (
          <TextField
            label="Guardian Phone Number"
            {...field}
            error={!!errors.guardian_phone_number}
            helperText={errors.guardian_phone_number?.message}
            fullWidth
          />
        )}
      />

      {/* Guardian Relationship */}
      <Controller
        name="guardian_relationship"
        control={control}
        render={({ field }) => (
          <TextField
            label="Guardian Relationship"
            {...field}
            error={!!errors.guardian_relationship}
            helperText={errors.guardian_relationship?.message}
            fullWidth
          />
        )}
      />
    </Stack>
  );
};

export default GuardianUpdateForm;