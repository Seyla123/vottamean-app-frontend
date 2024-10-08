import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Typography, Box, InputAdornment } from '@mui/material';

const CreateModal = ({ open, onClose, title, description, fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({});  // Reset form after submission
      onClose();
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <TextField
            select
            fullWidth
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            variant="outlined"
          >
            {field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case 'time':
        return (
          <TextField
            type="time"
            fullWidth
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            variant="outlined"
          />
        );
      default:
        return (
          <TextField
            variant="outlined"
            fullWidth
            type={field.type || 'text'}
            placeholder={field.placeholder || field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            multiline={field.multiline}
            rows={field.multiline ? 4 : 1}
            slotProps={{
              input: {
                startAdornment: field.icon && (
                  <InputAdornment position="start">
                    {field.icon}
                  </InputAdornment>
                ),
              },
            }}
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <Typography variant="body1" gutterBottom>{description}</Typography>}
        <Stack spacing={2} mt={2}>
          {fields.map((field) => (
            <Box key={field.name} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {field.label}{' '}
                {field.required && <span style={{ color: 'red', marginLeft: 1 }}>*</span>}
              </Typography>
              {renderField(field)}
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
