import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"

const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
  
}

function ClassPeriodDetailPage() {
  return (
<FormComponent title={'Class Period Detail'} subTitle={'These are Class Period’s information'}>
  <CardComponent 
    title={"Class Period Information"} 
    handleEdit={clickEdit} 
    handleDelete={clickDetele}>
    <CardInformation  data={info} />
  </CardComponent>
</FormComponent>
  );
}

export default ClassPeriodDetailPage;

const info = {
  "Class Period ID": 123,
  "Start Time": "8:00 AM",
  "End Time": "8:30 AM",
  Period: "1h 30mn",
};