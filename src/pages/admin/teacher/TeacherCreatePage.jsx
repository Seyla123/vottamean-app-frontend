import React from 'react';
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from '../../../components/common/FormComponent';
function TeacherCreatePage() {
  
  const handleCancel = () => {
    navigate('/teacher');
  };

  return (
    <>
      {/* Header */}
      <FormComponent
        title="ADD TEACHER"
        subTitle="Please Update Teacher Information"
      >
        {/* Form input */}
        <FormInfo mode="create" handleCancel={handleCancel} />
      </FormComponent>
    </>
  );
}

export default TeacherCreatePage;
