import React from 'react';
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
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
