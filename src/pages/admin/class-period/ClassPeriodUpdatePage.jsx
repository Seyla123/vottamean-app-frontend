import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';


import dayjs from 'dayjs';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';

import { containerInput, timeInput } from '../../../styles/classPeriod';
import { useNavigate } from 'react-router-dom';


function ClassPeriodUpdatePage() {
  const [startTime, setStartTime] = useState(dayjs('2024-04-17T8:00'));
  const [endTime, setEndTime] = useState(dayjs('2024-04-17T8:00'));
  const navigate = useNavigate();

  const onClickNext = () => {
    if (!startTime || !endTime) {
      navigate(`/dashboard/class-periods`);
    } else {
      navigate(`/dashboard/class-periods`);
    }
  };
  const onClickBack = () => {
    navigate(`/dashboard/class-periods`);
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
