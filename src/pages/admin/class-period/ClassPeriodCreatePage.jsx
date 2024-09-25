import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';

import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';

import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useNavigate } from 'react-router-dom';

import { useCreateClassPeriodMutation } from '../../../services/classPeriodApi';

// Validation schema
import { ClassPeriodValidator } from '../../../validators/validationSchemas';

function ClassPeriodCreatePage() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();

  // Redux hook for creating class period
  const [createClass, { error: apiError }] = useCreateClassPeriodMutation();

  // Initialize useForm with yup validation schema
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
      const result = await createClass({
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        ...data,
      }).unwrap();

      navigate(`/admin/class-periods`);
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
            <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']}>
              <Box sx={containerInput}>
                <Box>
                  <Typography
                    color={!startTime && errors.start_time ? 'red' : 'inherit'}
                  >
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
                  <Typography
                    color={!endTime && errors.end_time ? 'red' : 'inherit'}
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

          {/* Display API error if any */}
          {apiError && (
            <Typography color="red">
              Failed to create class period. Try again.
            </Typography>
          )}
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodCreatePage;
