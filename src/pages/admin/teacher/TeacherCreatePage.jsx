import React from 'react';
import TeacherInfo from '../../../components/teacher/TeacherInfo';
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
        {/* Form edit */}
        <TeacherInfo mode="create" handleCancel={handleCancel} />
      </FormComponent>
    </>
  );
}

export default TeacherCreatePage;
