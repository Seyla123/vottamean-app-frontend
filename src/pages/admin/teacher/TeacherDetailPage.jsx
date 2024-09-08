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
  "Full Name ": "John Doe",
  "Email": "johndoe@example.com",
  "Phone Number": "0923456789",
  "Address": "123 Street, ABC City, ABC Country",
  "Date of Birth": "1990-01-01",
  "Gender": "Male",
  "Degree": "Bachelor of Science in Computer Engineering",
  "University": "University of Technology",
  "Graduation Date": "2010-01-01",
  "Marital Status": "Single",
  "Religion": "Buddhist",
  "Nationality": "Myanmar",
}
function TeacherDetailPage() {
  return (
<FormComponent title={'Teacher Detail'} subTitle={'These are Teacher’s information'}>
  <CardComponent 
    title={"Teacher Information"} 
    imgUrl='ddddd' 
    handleEdit={clickEdit} 
    handleDelete={clickDetele}>
    <CardInformation  data={teacher} />
  </CardComponent>
</FormComponent>
  )
}

export default TeacherDetailPage
