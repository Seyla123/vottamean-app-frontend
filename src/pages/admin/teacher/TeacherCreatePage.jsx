import React from "react";
import FormInfo from '../../../components/teacher/FormInfo';
import FormComponent from "../../../components/common/FormComponent";

function TeacherCreatePage() {
  return (
      <>
        {/* Header */}
        <FormComponent title={"Teacher Create"} subTitle={"Please Fill Teacher Information"}>
        {/* Tabs */}
        <FormInfo />
      </FormComponent>
      </>
  );
}

export default TeacherCreatePage;
