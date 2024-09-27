import React, { useState, useEffect } from 'react';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { useGetSubjectByIdQuery, useDeleteSubjectMutation } from '../../../services/subjectApi';
import { subjectDetail } from '../../../utils/formatData';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';


function SubjectDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const { modal } = useSelector((state) => state.ui);
  
  const { data, error, isLoading, isSuccess } = useGetSubjectByIdQuery(id);
  const [
    deleteSubject, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }
  ] = useDeleteSubjectMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setDetails(subjectDetail(data));
    }
  }, [data, isSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error' }));
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' }),
      );
      navigate('/admin/subjects');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  const clickEdit = () => {
    navigate(`/admin/subjects/update/${id}`);
  };

  const clickDetele = () => {
    setSubjectToDelete(data.data);
    dispatch(setModal({ open: true }));
  };

  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteSubject(subjectToDelete.subject_id).unwrap();
  };

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
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Subject"
      />
    </FormComponent>
  );
}

export default SubjectDetailPage;
