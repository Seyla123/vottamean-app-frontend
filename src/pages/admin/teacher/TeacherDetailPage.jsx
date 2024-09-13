import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"

const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
}

const teacher = {
  "TeacherID" : "ANB00101",
  "Full Name ": "Potato Fried",
  "Age": 18,
  "Gender": "Male",
  "Date of Birth": "01/01/2001",
  "Phone": "01234567",
  "Email": "mrpotato123gmail.com",
  "Address": "Potato Chip City, FrenchFried Country",
}
function TeacherDetailPage() {
  return (
<FormComponent title={'Teacher Detail'} subTitle={"These are Teacher’s information"}>
  <CardComponent 
    title={"Teacher Information"} 
    imgUrl='r' 
    handleEdit={clickEdit} 
    handleDelete={clickDetele}>
    <CardInformation  data={teacher} />
  </CardComponent>
</FormComponent>
  )
}

export default TeacherDetailPage
