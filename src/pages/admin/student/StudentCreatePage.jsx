import React from 'react';
import FormInfoStudent from '../../../components/student/FormInfoStudent';
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
        <FormInfoStudent />
      </FormComponent>
    </>
  );
}

export default StudentCreatePage;
