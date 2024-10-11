// StudentUpdateForm.js
import React from 'react';
import { Button, MenuItem,Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const StudentUpdateForm = ({ control, errors, rows, handleImageChange }) => {
  return (
    <Stack spacing={3}>
      {/* Profile picture upload */}
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

      {/* First Name */}
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            label="First Name"
            {...field}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            fullWidth
          />
        )}
      />

      {/* Last Name */}
      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Last Name"
            {...field}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            fullWidth
          />
        )}
      />

      {/* Phone Number */}
      <Controller
        name="phone_number"
        control={control}
        render={({ field }) => (
          <TextField
            label="Phone Number"
            {...field}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            fullWidth
          />
        )}
      />

      {/* Address */}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            label="Address"
            {...field}
            error={!!errors.address}
            helperText={errors.address?.message}
            fullWidth
          />
        )}
      />

      {/* Date of Birth */}
      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <TextField
            label="Date of Birth"
            type="date"
            {...field}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
            fullWidth
          />
        )}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Gender"
            {...field}
            fullWidth
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        )}
      />

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
    </Stack>
  );
};

export default StudentUpdateForm;