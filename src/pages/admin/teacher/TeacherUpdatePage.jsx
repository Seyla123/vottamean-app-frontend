import React from 'react';
import Header from '../../../components/teacher/Header';
import FormComponent from '../../../components/common/FormComponent';
import UpdateTeacherForm from '../../../components/teacher/UpdateTeacherForm';
import { useParams } from 'react-router-dom';

function TeacherUpdatePage() {
  const { id } = useParams();

  return (
    <>
      {/* Header */}
      <FormComponent
        title="UPDATE TEACHER"
        subTitle="Please Update Teacher Information"
      >
        {/* Form edit */}
        <UpdateTeacherForm teacherId={id} />
      </FormComponent>
    </>
  );
}

export default TeacherUpdatePage;
