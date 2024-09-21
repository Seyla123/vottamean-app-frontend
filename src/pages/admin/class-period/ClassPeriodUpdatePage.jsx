import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';
import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ClassPeriodValidator } from '../../../validators/validationSchemas';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import dayjs from 'dayjs';
import {
  useGetClassPeriodByIdQuery,
  useUpdateClassPeriodMutation,
} from '../../../services/classPeriodApi';

function ClassPeriodUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading } = useGetClassPeriodByIdQuery(id);
  const [updateClassPeriod, { isSuccess, isError, isLoading: isUpdating }] =
    useUpdateClassPeriodMutation();

  // State for time picker
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errorTime, setErrorTime] = useState(''); // State for time error message

  // Initialize useForm with yup validation schema
  const {
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
    }
  }, [data]);

  const onClickNext = async () => {
    // Check if startTime is equal to endTime
    if (startTime.isSame(endTime)) {
      setErrorTime("End time can't be the same as start time");
      return; // Prevent submission
    }
    
    // Clear the error if validation passes
    setErrorTime('');

    // Format times before sending the request
    const formattedStartTime = startTime.format('HH:mm:ss');
    const formattedEndTime = endTime.format('HH:mm:ss');

    await updateClassPeriod({
      id,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    });
  };

  // Handle stages
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  if (isSuccess) {
    navigate(`/admin/class-periods`);
  }

  const onClickBack = () => {
    navigate(`/admin/class-periods`);
  };

  return (
    <>
      <FormComponent
        title={'Update Class Period'}
        subTitle={'Please Fill Class Period Information'}
      >
        <CardComponent title={'Class Period Information'}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker', 'TimePicker', 'TimePicker']}>
                <Box sx={containerInput}>
                  <Box>
                    <Typography>Start time</Typography>
                    <TimePicker
                      sx={timeInput}
                      value={startTime}
                      onChange={(newValue) => {
                        setStartTime(newValue);
                        setValue('start_time', newValue ? newValue.format('HH:mm') : '');
                        clearErrors('start_time');
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography color={errorTime ? 'red' : 'inherit'}>
                      End time
                    </Typography>
                    <TimePicker
                      sx={timeInput}
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                        setValue('end_time', newValue ? newValue.format('HH:mm') : '');
                        clearErrors('end_time');

                        // Clear the error message if endTime changes
                        setErrorTime('');
                      }}
                      slotProps={{
                        textField: {
                          placeholder: 'Select end time',
                          helperText: errorTime || '', // Display error message if it exists
                          error: !!errorTime, // Set error state based on errorTime
                        },
                      }}
                    />
                  </Box>
                </Box>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <ButtonContainer
            leftBtn={onClickBack}
            rightBtn={onClickNext}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassPeriodUpdatePage;
