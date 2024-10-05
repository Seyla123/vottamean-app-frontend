import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';
import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import components
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import validator, uiSlice and  api 
import { ClassPeriodValidator } from '../../../validators/validationSchemas';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useGetClassPeriodByIdQuery, useUpdateClassPeriodMutation } from '../../../services/classPeriodApi';
                                                                                                                                                                                                                                                                                                                                               
function ClassPeriodUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch calss period details
  const { data, isLoading } = useGetClassPeriodByIdQuery(id);

  // Mutation for updating subject
  const [updateClassPeriod, { isUpdating, isUpdateError, isSuccess, error }] = useUpdateClassPeriodMutation();

  // State for time picker
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Initialize useForm with yup validation schema
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(ClassPeriodValidator),
  });

  // Use useEffect to update state when data is available
  useEffect(() => {
    if (data) {
      const formattedStartTime = dayjs(data.data.start_time, 'HH:mm:ss');
      const formattedEndTime = dayjs(data.data.end_time, 'HH:mm:ss');
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);

      // Ensure form values are set when data is loaded
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
          severity: 'info' }),
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
    } catch (error) {
      console.log('Failed to update class period:', error);
    }
  };

  // Handle stages
  if (isLoading)  return <CircularIndeterminate />;

  return (
    <>
      <FormComponent
        title={'Update Class Period'}
        subTitle={'Please Fill Class Period Information'}
      >
        <CardComponent title={'Class Period Information'}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['TimePicker', 'TimePicker', 'TimePicker']}
              >
                <Box sx={containerInput}>
                  <Box>
                    <Typography>
                      Start time
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
                    <Typography
                      color={!!errors.end_time ? 'red' : 'inherit'}
                    >
                      End time
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
                </Box>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <ButtonContainer
            rightBtn={handleSubmit(onClickNext)}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodUpdatePage;
