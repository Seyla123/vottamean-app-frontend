import React, { useState, useEffect } from 'react';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { useGetSubjectByIdQuery } from '../../../services/subjectApi';
import { subjectDetail } from '../../../utils/formatData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';

const clickEdit = () => {
  console.log('edit');
};
const clickDetele = () => {
  console.log('delete');
};

function SubjectDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  
  const { data, error, isLoading, isSuccess } = useGetSubjectByIdQuery(id);

  useEffect(() => {
    if (data && isSuccess) {
      setDetails(subjectDetail(data));
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Manually remove or nullify the `photo` property in the `data` object
  const dataWithoutPhoto = {
    ...data.data,
    Info: {
      ...data.data.Info,
      photo: null,  // This will prevent the `Avatar` from being rendered
    },
  };

  return (
    <FormComponent
      title={'Subject Detail'}
      subTitle={'These are Subject’s information'}
    >
      <CardComponent
        title={'Subject Information'}
        handleEdit={clickEdit}
        handleDelete={clickDetele}
        data={dataWithoutPhoto}  // Pass data with `photo` field set to null
      >
        <CardInformation data={details} />
      </CardComponent>
    </FormComponent>
  );
}

export default SubjectDetailPage;
