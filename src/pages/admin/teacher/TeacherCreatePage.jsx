import React from 'react';
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
function TeacherCreatePage() {
  return (
    <>
      {/* Header */}
      <FormComponent
        title="Add Teacher"
        subTitle="Please Add Teacher Information"
      >
        {/* Form Content */}
        <FormInfo />
      </FormComponent>
    </>
  );
}

export default TeacherCreatePage;
