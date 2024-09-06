import { Box } from '@mui/material';
import React from 'react';
import Header from '../../../components/teacher/Header';
import TeacherInfo from '../../../components/teacher/TeacherInfo';

function TeacherUpdatePage() {
  const handleCancel = () => {
    navigate("/teacher");
  };

  return (
    <Box>
      {/* Header */}
      <Header header="UPDATE TEACHER" subheader=" Please Update Teacher Information" />
      {/* Form edit */}
      <TeacherInfo mode="update" handleCancel={handleCancel} />
    </Box>
  );
}

export default TeacherUpdatePage;
