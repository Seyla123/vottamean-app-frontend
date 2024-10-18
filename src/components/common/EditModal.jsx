import React, { useEffect, useState } from 'react';
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
  IconButton,
  CircularProgress,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';
import { BootstrapDialog } from './BootstrapDialog';

const EditModal = ({
  open,
  onClose,
  title,
  description,
  fields,
  validationSchema,
  id,
  getDataQuery,
  useUpdateDataMutation,
}) => {
  // data: data from Redux store of the record to be edited
  // isLoading: boolean indicating if the data is still being fetched
  const { data, isLoading } = getDataQuery(id, { skip: !id });

  // initialData: the initial values of the form fields
  // it is used to check if there are any changes made to the form
  const [initialData, setInitialData] = useState(null);

  const dispatch = useDispatch();

  // useUpdateDataMutation : returns a function to update data from props
  const [
    updateData,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdatedSuccess,
      error: updateError,
    },
  ] = useUpdateDataMutation();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: '' }),
      {},
    ),
    mode: 'onChange',
  });

  // Set initial form data
  useEffect(() => {
    if (data) {
      const initialFormData = {};
      fields.forEach((field) => {
        const value = data.data[field.name] || '';
        initialFormData[field.name] = value;
        setValue(field.name, value);
      });
      setInitialData(initialFormData);
    }
  }, [data, setValue, fields]);

  // when update is failed, show a snackbar with an error message
  // when update is successful, show a snackbar with a success message
  useEffect(() => {
    if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: updateError?.data?.message || 'Failed to update',
          severity: 'error',
        }),
      );
      onClose();
    } else if (isUpdatedSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update successfully',
          severity: 'success',
        }),
      );
      onClose();
    }
  }, [isUpdating, isUpdateError, isUpdatedSuccess, updateError, dispatch]);

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

  const onSubmit = async () => {
    // Check if any of the form data has changed
    const formData = getValues();
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key],
    );

    // If no changes were made, show a message and exit
    if (!hasChanges) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
        }),
      );
      return;
    }
    // Submit update form
    await updateData({ id, formData }).unwrap();
  };

  // Handles closing the modal.
  //  Resets the form state and calls the onClose callback function.
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <BootstrapDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>

      <DialogContent dividers>
        {isLoading ? (
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : (
          <Stack spacing={2}>
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
        )}
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleClose} size="small">
          Cancel
        </StyledButton>
        <StyledButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          size="small"
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditModal;
