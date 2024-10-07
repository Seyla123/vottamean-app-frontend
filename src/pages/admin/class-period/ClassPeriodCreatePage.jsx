import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import components
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import validator, style, api and uiSlice
import { ClassPeriodValidator } from '../../../validators/validationSchemas';
import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useCreateClassPeriodMutation } from '../../../services/classPeriodApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

function ClassPeriodCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useCreateSubjectMutation : returns a function to create a subject
  const [createClass, { isLoading, isError, isSuccess, error }] =
    useCreateClassPeriodMutation();

  // useEffect: set values for start and end time
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating...',
          severity: 'info'
        }),
      );
    } else if (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message,
          severity: 'warning',
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message || 'Error creating class period',
          severity: 'error',
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Created successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/class-periods');
    }
  }, [isLoading, isError, isSuccess, dispatch, navigate]);

  // yup validator
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(ClassPeriodValidator),
  });

  const onSubmit = async (data) => {
    // Additional validation for time picker fields
    if (!startTime || !endTime) {
      return; // Handle required time validation
    }

    const formattedStartTime = startTime.format('HH:mm');
    const formattedEndTime = endTime.format('HH:mm');

    try {
      await createClass({
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        ...data,
      }).unwrap();
    } catch (error) {
      console.log('Failed to create class period:', error);
    }
  };

  return (
    <>
      <FormComponent
        title={'Add Class Period'}
        subTitle={'Please Fill Class Period Information'}
      >
        <CardComponent title={'Class Period Information'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['TimePicker', 'TimePicker', 'TimePicker']}
            >
              <Box sx={containerInput}>
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
                      if (newValue) {
                        clearErrors('start_time');
                      }
                    }}
                    slotProps={{
                      textField: {
                        placeholder: 'Select start time',
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
                        placeholder: 'Select end time',
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

          <ButtonContainer
            rightBtn={handleSubmit(onSubmit)}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Add Period'}
          />

        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodCreatePage;
