import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { useGetClassPeriodByIdQuery } from '../../../services/classPeriodApi';
import { useParams } from 'react-router-dom';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatTime';

const clickEdit = () => {
  console.log('edit');
};
const clickDetele = () => {
  console.log('delete');
};

function ClassPeriodDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetClassPeriodByIdQuery(id);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  const { period_id, start_time, end_time } = data.data;

  const newArray = {
    'Period id': period_id,
    'Start time': formatTimeTo12Hour(start_time),
    'End time': formatTimeTo12Hour(end_time),
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
        <CardInformation data={newArray} />
      </CardComponent>
    </FormComponent>
  );
}

export default ClassPeriodDetailPage;
