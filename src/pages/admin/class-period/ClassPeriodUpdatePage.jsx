import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useNavigate, useParams } from 'react-router-dom';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import dayjs from 'dayjs';
import {useGetClassPeriodByIdQuery} from '../../../services/classPeriodApi';

function ClassPeriodUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetClassPeriodByIdQuery(id);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Use useEffect to update state when data is available
  useEffect(() => {
    if (data) {
      const formattedStartTime = dayjs(data.data.start_time, 'HH:mm:ss');
      const formattedEndTime = dayjs(data.data.end_time, 'HH:mm:ss');
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);
    }
  }, [data]); // This effect runs when data changes

  // Handle loading state
  if (isLoading) {
    return <CircularIndeterminate />;
  }
  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  const onClickNext = () => {
    if (!startTime || !endTime) {
      navigate(`/admin/class-periods`);
    } else {
      navigate(`/admin/class-periods`);
    }
  };

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
              <DemoContainer
                components={['TimePicker', 'TimePicker', 'TimePicker']}
              >
                <Box sx={containerInput}>
                  <Box>
                    <Typography>Start time</Typography>
                    <TimePicker
                      sx={timeInput}
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                  </Box>
                  <Box>
                    <Typography>End time</Typography>
                    <TimePicker
                      sx={timeInput}
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
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
