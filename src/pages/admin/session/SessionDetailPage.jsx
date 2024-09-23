import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"
import { useGetSessionByIdQuery } from "../../../services/sessionApi"
import  LoadingCircle  from "../../../components/loading/LoadingCircle"
import { useNavigate } from "react-router-dom"


function SessionDetailPage() {
  const {data , error, isLoading} = useGetSessionByIdQuery(); 

  const navigate = useNavigate();
  
  const clickEdit = () => {
    navigate(`/admin/sessions/update/${data.data.session_id}`);
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
