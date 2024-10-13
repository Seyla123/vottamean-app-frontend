import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
// import api and uiSlice
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import {
  useGetClassesByIdQuery,
  useDeleteClassesDataMutation,
} from '../../../services/classApi';
import StudentListTable from '../../../components/student/StudentListTable';

function ClassDetailPage() {
  // useState: "data to be displayed as details" and "data to be deleted"
  const [details, setDetails] = useState([]);
  const [classToDelete, setClassToDelete] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { modal } = useSelector((state) => state.ui);

  // Fetch class data using the API hook and Id
  const { data, error, isLoading, isSuccess } = useGetClassesByIdQuery(id);

  // useDeleteClassesDataMutation : returns a function to delete a class
  const [ deleteClass,
    { isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError }
  ] = useDeleteClassesDataMutation();

  useEffect(() => {
    // set the details state when class records are fetched successfully
    if (data && isSuccess) {
      setDetails(classData);
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
      navigate('/admin/classes');
    }
  }, [ data, isSuccess, isDeleteSuccess, isDeleteError, isDeleting, dispatch ]);

  if (isLoading) return <LoadingCircle />
  if (error) return <div>Error loading class periods: {error.message}</div>

  // Handle EDIT action
  const clickEdit = () => {
    navigate(`/admin/classes/update/${id}`);
  };

  // Handle DELETE action
  const clickDetele = () => {
    setClassToDelete(data.data);
    dispatch(setModal({ open: true }));
  };
  
  // Handle delete confirmation modal
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteClass(classToDelete.class_id).unwrap();
  };

  const { class_id, class_name, description } = data.data;
  const classData = {
    'Class ID': class_id,
    'Class Name': class_name,
    'Description': description
  };

  return (
    <FormComponent
      title={`Class Detail`}
      subTitle={`These are Class's information`}
    >
      <Stack gap={2}>
        <CardComponent
          title={'Class Information'}
          handleEdit={clickEdit}
          handleDelete={clickDetele}
        >
          <CardInformation data={details} />
        </CardComponent>
      </Stack>

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Class"
      />
      
      <CardComponent title={`Total ${totalStudents} Students`}>
      <StudentListTable setTotalStudents={setTotalStudents} />
      </CardComponent>
    </FormComponent>


  );
}

export default ClassDetailPage;
