import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { useGetClassPeriodByIdQuery } from '../../../services/classPeriodApi';
import { useNavigate, useParams } from 'react-router-dom';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatData';

function ClassPeriodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetClassPeriodByIdQuery(id);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Handle EDIT action
  const clickEdit = (row) => {
    navigate(`/admin/class-periods/update/${row.id}`);
  };

  // Handle DELETE action
  const clickDetele = () => {
    console.log('delete');
  };

  const { period_id, start_time, end_time } = data.data;

  // Define formatted data to display
  const periodDetail = {
    'Class Period ID': period_id,
    'Start Time': formatTimeTo12Hour(start_time),
    'End Time': formatTimeTo12Hour(end_time),
    'Period': calculatePeriod(start_time, end_time),
  };

  return (
    <FormComponent
      title={'Class Period Detail'}
      subTitle={'These are Class Period’s information'}
    >
      <CardComponent
        title={'Class Period Information'}
        handleEdit={clickEdit}
        handleDelete={clickDetele}
      >
        <CardInformation data={periodDetail} />
      </CardComponent>
    </FormComponent>
  );
}

export default ClassPeriodDetailPage;
