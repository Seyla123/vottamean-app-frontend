import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  Typography,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { timeInput } from '../../styles/classPeriod';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ClassPeriodValidator } from '../../validators/validationSchemas';
import { setSnackbar } from '../../store/slices/uiSlice';
import {
  useGetClassPeriodByIdQuery,
  useUpdateClassPeriodMutation,
} from '../../services/classPeriodApi';
import StyledButton from './StyledMuiButton';
import { BootstrapDialog } from './BootstrapDialog';
import { X } from 'lucide-react';

function EditClassPeriodModal({ open, onClose, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useGetClassPeriodByIdQuery: a hook that returns a function to fetch a class period by ID
  // skip: if the id is not provided, skip the query
  const { data, isLoading } = useGetClassPeriodByIdQuery(id, { skip: !id });

  // useUpdateClassPeriodMutation: a hook that returns a function to update a class period
  const [updateClassPeriod, { isLoading: isUpdating, isError: isUpdateError, isSuccess, error }] =
    useUpdateClassPeriodMutation();

  // startTime and endTime: the current values of the time fields
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // initialData: the initial values of the form fields
  // it is used to check if there are any changes made to the form
  const [initialData, setInitialData] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues
  } = useForm({
    resolver: yupResolver(ClassPeriodValidator),
  });

  // When the data is received, format the start and end times
  // and set the initial values of the form fields
  useEffect(() => {
    if (data) {
      const formattedStartTime = dayjs(data.data.start_time, 'HH:mm:ss');
      const formattedEndTime = dayjs(data.data.end_time, 'HH:mm:ss');
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);

      setValue('start_time', formattedStartTime.format('HH:mm'), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('end_time', formattedEndTime.format('HH:mm'), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setInitialData(getValues())
    }
  }, [data, setValue]);

  // when update is failed, show a snackbar with an error message
  // when update is successful, show a snackbar with a success message
  useEffect(() => {
    if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'Error updating class period',
          severity: 'error',
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
    }
  }, [isUpdating, isUpdateError, isSuccess, dispatch, error, navigate]);

  const onSubmit = async () => {
    const formattedStartTime = startTime.format('HH:mm:ss');
    const formattedEndTime = endTime.format('HH:mm:ss');
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
    await updateClassPeriod({
      id,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    });
    onClose();
  };

  return (
    <BootstrapDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Update Class Period</DialogTitle>
      <IconButton
        onClick={onClose}
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['TimePicker', 'TimePicker', 'TimePicker']}
            >

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Start time
                    <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                      setValue(
                        'start_time',
                        newValue ? newValue.format('HH:mm') : '',
                      );
                    }}
                    slotProps={{
                      textField: {
                        helperText: errors.start_time
                          ? errors.start_time.message
                          : '',
                        error: !!errors.start_time,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    End time
                    <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                  </Typography>
                  <TimePicker
                    sx={timeInput}
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                      setValue(
                        'end_time',
                        newValue ? newValue.format('HH:mm') : '',
                      );
                      if (newValue) {
                        clearErrors('end_time');
                      }
                    }}
                    slotProps={{
                      textField: {
                        helperText: errors.end_time
                          ? errors.end_time.message
                          : '',
                        error: !!errors.end_time,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </DemoContainer>
          </LocalizationProvider>
        )}
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
        <StyledButton
          variant={'contained'}
          onClick={handleSubmit(onSubmit)}
          disabled={isUpdating || isLoading}
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default EditClassPeriodModal;
