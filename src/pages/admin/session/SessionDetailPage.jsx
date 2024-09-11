import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"

const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
  
}

const session = {
  "Teach By" : "Seav Seyla",
  "Time": "7:00 - 8:00",
  "Period":"1h",
  "Subject":"Math",
  "Class":"A05",
  "Day of week":"Monday",
}
function SessionDetailPage() {
  return (
<FormComponent title={'Session Detail'} subTitle={"These are Session's information"}>
  <CardComponent 
    title={"Subject Information"} 
    handleEdit={clickEdit} 
    handleDelete={clickDetele}>
    <CardInformation  data={session} />
  </CardComponent>
</FormComponent>
  )
}

export default SessionDetailPage
