import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"
import {Stack } from '@mui/material';
const clickEdit = () => {
  console.log('edit')
}
const clickDetele = ()=>{
  console.log('delete');
  
}

const classData = {
  "Class ID" : "00101",
  "Class Name": "Potato Fried",
  "Total": "40 Students",
  "Female": "5 Students",
  "Description" : "Lorem ipsum dolor sit amet consectetur"
}
function ClassDetailPage() {
  return (
<FormComponent title={'Class Detail'} subTitle={'These are Subject’s information'}>
  <Stack gap={2}>
    <CardComponent 
      title={"Class Information"} 
      handleEdit={clickEdit} 
      handleDelete={clickDetele}>
      <CardInformation  data={classData} />
    </CardComponent>
    <CardComponent title={"Total 40 Students"}>
      {/* add table here */}
    </CardComponent>
  </Stack>
</FormComponent>
  )
}

export default ClassDetailPage
