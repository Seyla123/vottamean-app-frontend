import {FormComponent, CardComponent,CardInformation} from "../../../components/common";
function TeacherDetailPage() {
  return (
<FormComponent title={'Teacher Detail'} subTitle={'These are Teacher’s information'}>
<CardComponent title={"Teacher Information"}>
<CardInformation/>
</CardComponent>
</FormComponent>
  )
}

export default TeacherDetailPage
