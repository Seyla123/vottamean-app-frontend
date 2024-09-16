import { Box } from '@mui/material';
import React from 'react';
import Header from '../../../components/teacher/Header';
import TeacherInfo from '../../../components/teacher/TeacherInfo';
import FormComponent from '../../../components/common/FormComponent';
function TeacherUpdatePage() {
  const handleCancel = () => {
    navigate('/teacher');
  };

  return (
    <>
      {/* Header */}
      <FormComponent
        title="UPDATE TEACHER"
        subTitle="Please Update Teacher Information"
      >
        {/* Form edit */}
        <TeacherInfo mode="update" handleCancel={handleCancel} />
      </FormComponent>
    </>
  );
}

export default TeacherUpdatePage;
