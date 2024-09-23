import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"
import { useGetSessionByIdQuery } from "../../../services/sessionApi"
import  LoadingCircle  from "../../../components/loading/LoadingCircle"
import { useNavigate,useParams } from "react-router-dom"
import { calculatePeriod } from "../../../utils/formatData"


function SessionDetailPage() {
  // get the id from the route params
  const {id} = useParams();
  const {data , error, isLoading} = useGetSessionByIdQuery(id); 
  // const [remove , result] = useDeleteSessionMutation();

  const navigate = useNavigate();
  
  const clickEdit = () => {
    navigate(`/admin/sessions/update/${id}`);
  }

  const clickDetele = ()=>{
    // remove(id)
  }

  if(isLoading){
    return <LoadingCircle/>
  }

  if(error){
    return <div>Error loading session: {error.message}</div>
  }
  
  const session = data?.data ? {
    "Teach By": `${data.data.Teacher.Info.first_name} ${data.data.Teacher.Info.last_name}`,
    "Time": `${data.data.Period.start_time} - ${data.data.Period.end_time}`,
    "Period": calculatePeriod(data.data.Period.start_time, data.data.Period.end_time),
    "Subject": data.data.Subject.name,
    "Class": data.data.Class.class_name,
    "Day of week": data.data.DayOfWeek.day,
  } : {};

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
