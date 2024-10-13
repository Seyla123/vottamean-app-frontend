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
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import LoadingCircle from '../loading/LoadingCircle';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

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
  const { data, isLoading } = getDataQuery(id, { skip: !id });
  const [initialData, setInitialData] = useState(null);

  const dispatch = useDispatch();

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
    const formData = getValues();
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key],
    );

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

    await updateData({ id, formData }).unwrap();

    dispatch(
      setSnackbar({
        open: true,
        message: 'Updated successfully',
        severity: 'success',
      }),
    );
    onClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="edit-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="edit-dialog-title">
        {title}
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </DialogTitle>
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
