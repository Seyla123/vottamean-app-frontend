import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import api and uiSlice
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
// import components
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { useGetSubjectByIdQuery, useDeleteSubjectMutation } from '../../../services/subjectApi';


function SubjectDetailPage() {
  // useState: "data to be displayed as details" and "data to be deleted"
  const [details, setDetails] = useState([]);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { modal } = useSelector((state) => state.ui);

  // useGetSubjectByIdQuery : return a function a subject within ID
  const { data, error, isLoading, isSuccess } = useGetSubjectByIdQuery(id);

  // useDeleteSubjectMutation : returns a function to delete a subject
  const [ deleteSubject,
    { isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError }
  ] = useDeleteSubjectMutation();

  useEffect(() => {
    // set the details state when subject records are fetched successfully
    if (data && isSuccess) {
      setDetails(subjectDetail);
    }

    // Show a snackbar with messages during delete (progress, failure, success)
    if (isDeleting) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleting...',
        severity: 'info'
      }));
    } else if (isDeleteError) {
      dispatch( setSnackbar({
        open: true,
        message: error.data.message,
        severity: 'error'
      }));
    } else if (isDeleteSuccess) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleted successfully',
        severity: 'success'
      }));
      navigate('/admin/subjects');
    }
  }, [ data, isSuccess, isDeleteSuccess, isDeleteError, isDeleting, dispatch ]);

  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Handle EDIT action
  const clickEdit = () => {
    navigate(`/admin/subjects/update/${id}`);
  };

  // Handle DELETE action
  const clickDetele = () => {
    setSubjectToDelete(data.data);
    dispatch(setModal({ open: true }));
  };

  // Handle delete confirmation modal
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteSubject(subjectToDelete.subject_id).unwrap();
  };

  const { subject_id, subject_name, description } = data.data;
  const subjectDetail = {
    'Subject ID': subject_id,
    'Subject Name': subject_name,
    'Description': description
  }

  return (
    <FormComponent
      title={'Subject Detail'}
      subTitle={'These are Subject’s information'}
    >
      <CardComponent
        title={'Subject Information'}
        handleEdit={clickEdit}
        handleDelete={clickDetele}
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
