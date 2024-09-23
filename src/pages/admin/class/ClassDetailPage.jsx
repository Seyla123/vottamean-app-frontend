import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetClassesByIdQuery } from '../../../services/classApi';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../../../components/loading/LoadingCircle';

function ClassDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch class data using the API hook and Id
  const { data, error, isLoading } = useGetClassesByIdQuery(id);

  if (isLoading) {
    return <LoadingCircle />;
  }
  //Extract the class Data
  const extractClassData = (data) => {
    const { class_id, class_name, description } = data.data;
    return { class_id, class_name, description };
  };
  const classData = extractClassData(data);

  const clickEdit = () => {
    navigate(`/admin/classes/update/${classData.class_id}`);
  };
  const clickDetele = () => {
    console.log('delete');
  };
  return (
    <FormComponent
      title={`${classData.class_name} Class Detail`}
      subTitle={`These are Class ${classData.class_name} information`}
    >
      <Stack gap={2}>
        <CardComponent
          title={'Class Information'}
          handleEdit={clickEdit}
          handleDelete={clickDetele}
        >
          <CardInformation data={classData} />
        </CardComponent>
        <CardComponent title={'Total 40 Students'}>
          {/* add table here */}
        </CardComponent>
      </Stack>
    </FormComponent>
  );
}
export default ClassDetailPage;



