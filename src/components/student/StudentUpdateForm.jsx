// StudentUpdateForm.js
import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import { useSelector } from 'react-redux';
import DOBPicker from '../common/DOBPicker';
import { UserRoundPen } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';

const StudentUpdateForm = ({ control, errors, rows, handleImageChange }) => {
  const studentData = useSelector((state) => state.student);
  // - Local State
  const [dob, setDob] = useState(
    studentData.dob ? dayjs(studentData.dob) : null,
  );
  return (
    <Stack spacing={3}>
      {/* Profile picture upload */}
      <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
      <input
        accept="image/*"
        type="file"
        id="photo-upload"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="photo-upload">
        <Button variant="contained" component="span" fullWidth>
          Upload Photo
        </Button>
      </label>
      </Box>
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

      {/* Class Selection */}
      <Controller
        name="class_id"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Class"
            {...field}
            fullWidth
            error={!!errors.class_id}
            helperText={errors.class_id?.message}
          >
            {rows.map((row) => (
              <MenuItem key={row.value} value={row.value}>
                {row.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Phone Number */}
      <PhoneInputField
        name="phone_number"
        control={control}
        label="Contact Number"
        errors={errors}
      />

      {/* Address */}
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

export default StudentUpdateForm;
const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

