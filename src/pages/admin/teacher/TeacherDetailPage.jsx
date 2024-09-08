import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"

const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
  
}
function TeacherDetailPage() {
  return (
<FormComponent title={'Teacher Detail'} subTitle={'These are Teacher’s information'}>
  <CardComponent title={"Teacher Information"} handleEdit={clickEdit} handleDelete={clickDetele}>
    <CardInformation/>
  </CardComponent>
</FormComponent>
  )
}

export default TeacherDetailPage
