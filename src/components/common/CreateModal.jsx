import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Typography,
  Box,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CreateModal = ({
  open,
  onClose,
  title,
  description,
  fields,
  onSubmit,
  validationSchema,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: '' }),
      {},
    ),
    mode: 'onChange', // This enables real-time validation
  });

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                fullWidth
                value={value}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                variant="outlined"
              >
                {field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        );
      case 'time':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  fullWidth
                  value={value ? dayjs(value, 'HH:mm') : null}
                  onChange={(newValue) =>
                    onChange(newValue ? newValue.format('HH:mm') : '')
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors[field.name],
                      helperText: errors[field.name]?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        );
      default:
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                fullWidth
                type={field.type || 'text'}
                placeholder={field.placeholder || field.label}
                value={value}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                multiline={field.multiline}
                rows={field.multiline ? 4 : 1}
                InputProps={{
                  startAdornment: field.icon && (
                    <InputAdornment position="start">
                      {field.icon}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        );
    }
  };

  const onSubmitForm = async (data) => {
    await onSubmit(data);
    if (!isValid) {
      reset(); // Reset form fields only after successful submission
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={'bold'} pb={2}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        )}
      </Box>
      <DialogContent>
        <Stack spacing={2} mt={2}>
          {fields.map((field) => (
            <Box
              key={field.name}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight="bold">
                {field.label}{' '}
                {field.required && (
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                )}
              </Typography>
              {renderField(field)}
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <StyledButton onClick={handleClose} size="large">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={handleSubmit(onSubmitForm)}
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4 }}
        >
          Create
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
