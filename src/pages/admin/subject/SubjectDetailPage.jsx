import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"

const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
  
}

const subject = {
  "Subject ID" : "00101",
  "Subject Name": "Potato Fried",
  "Description" : "This is a subject for learning how to cook potato fried."
}
function SubjectDetailPage() {
  return (
<FormComponent title={'Subject Detail'} subTitle={'These are Subject’s information'}>
  <CardComponent 
    title={"Subject Information"} 
    handleEdit={clickEdit} 
    handleDelete={clickDetele}>
    <CardInformation  data={subject} />
  </CardComponent>
</FormComponent>
  )
}

export default SubjectDetailPage
