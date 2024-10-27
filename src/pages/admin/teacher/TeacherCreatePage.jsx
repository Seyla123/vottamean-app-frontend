import React from 'react';
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
import TitleHeader from '../../../components/common/TitleHeader';
function TeacherCreatePage() {
  return (
    <>
      {/* Header */}
      <FormComponent
      >
        <TitleHeader title="Create Teacher" />
        {/* Form Content */}
        <FormInfo />
      </FormComponent>
    </>
  );
}

export default TeacherCreatePage;
