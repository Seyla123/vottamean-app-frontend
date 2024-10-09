import React from 'react';
import FormInfo from '../../../components/student/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
function StudentCreatePage() {
  return (
    <>
      {/* Header */}
      <FormComponent
        title="Create Student"
        subTitle="Please Add Student Information"
      >
        {/* Form input */}
        <FormInfo />
      </FormComponent>
    </>
  );
}

export default StudentCreatePage;
