import React from 'react';
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
import { Box, Typography } from '@mui/material';
function TeacherCreatePage() {
  return (
    <>
      {/* Header */}
      <FormComponent
        title="ADD TEACHER"
        subTitle="Please Update Teacher Information"
      >
        {/* Form input */}
        <FormInfo />
      </FormComponent>
    </>
  );
}

export default TeacherCreatePage;
const profileBox = {
  border: '1px solid',
  borderColor: '#E0E0E0',
  borderRadius: '8px',
  bgcolor: '#ffffff',

  padding: {
    xs: 2,
    sm: 3,
  },
};
const card = {
  border: '1px solid',
  borderColor: '#E0E0E0',
  borderRadius: '8px',
  bgcolor: '#ffffff',
};
