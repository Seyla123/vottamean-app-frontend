import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TeacherInfo from './TeacherInfo';
import AccountInfo from './AccountInfo';

function FormInfo() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    if (value === '1') {
      setValue('2');
    }
  };

  const handleBack = () => {
    if (value === '2') {
      setValue('1');
    }
  };

  return (
    <>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs information"
        >
          <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
          <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} />
        </Tabs>
      </Box>

      {value === '1' && <TeacherInfo handleNext={handleNext} />}
      {value === '2' && <AccountInfo handleBack={handleBack} />}
    </>
  );
}

export default FormInfo;
const tabSize = {
  fontWeight: 'medium',
  fontSize: {
    xs: '12px',
    sm: '14px',
  },
};
