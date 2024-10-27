import React from 'react';
import FormInfoStudent from '../../../components/student/FormInfoStudent';
import FormComponent from '../../../components/common/FormComponent';
import TitleHeader from '../../../components/common/TitleHeader';
function StudentCreatePage() {
  return (
    <>
      {/* Header */}
      <FormComponent
      >
        <TitleHeader title="Create Student" />
        {/* Form input */}
        <FormInfoStudent />
      </FormComponent>
    </>
  );
}

export default StudentCreatePage;
