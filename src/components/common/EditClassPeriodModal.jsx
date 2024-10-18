import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { containerInput, timeInput } from '../../styles/classPeriod';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LoadingCircle from '../../components/loading/LoadingCircle';
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

  const { data, isLoading } = useGetClassPeriodByIdQuery(id);
  const [updateClassPeriod, { isUpdating, isUpdateError, isSuccess, error }] =
    useUpdateClassPeriodMutation();

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(ClassPeriodValidator),
  });

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
    }
  }, [data, setValue]);

  useEffect(() => {
    if (isUpdating) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updating...',
          severity: 'info',
        }),
      );
    } else if (isUpdateError) {
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
      navigate('/admin/class-periods');
    }
  }, [isUpdating, isUpdateError, isSuccess, dispatch, error, navigate]);

  const onClickNext = async () => {
    const formattedStartTime = startTime.format('HH:mm:ss');
    const formattedEndTime = endTime.format('HH:mm:ss');
    try {
      await updateClassPeriod({
        id,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
      });
      onClose();
    } catch (error) {
      console.log('Failed to update class period:', error);
    }
  };

  return (
    <BootstrapDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Class Period</DialogTitle>
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
          onClick={handleSubmit(onClickNext)}
          disabled={isLoading}
        >
          Update
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default EditClassPeriodModal;
