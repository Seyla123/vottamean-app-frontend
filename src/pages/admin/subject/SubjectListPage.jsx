import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CreateModal from '../../../components/common/CreateModal';
import EditModal from '../../../components/common/EditModal';
import ViewModal from '../../../components/common/ViewModal';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import {
  useGetSubjectsQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useGetSubjectByIdQuery,
} from '../../../services/subjectApi';
import { SubjectValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';

const columns = [
  { id: 'subject_id', label: 'Subject ID' },
  { id: 'subject_name', label: 'Subject Name' },
  { id: 'description', label: 'Subject Description' },
];

function SubjectListPage() {
  const [rows, setRows] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  // API hooks
  const { data, isLoading, isSuccess, isError } = useGetSubjectsQuery();
  const [
    deleteSubject,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteSubjectMutation();

  const [createSubject] = useCreateSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setRows(data.data);
    }

    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteError.data?.message || 'Failed to delete subject',
          severity: 'error',
        }),
      );
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
    }
  }, [
    data,
    isSuccess,
    isDeleting,
    isDeleteError,
    isDeleteSuccess,
    dispatch,
    deleteError,
  ]);

  if (isLoading) return <CircularIndeterminate />;
  if (isError) console.log('error message:', isError.data.message);

  const handleCreate = async (formData) => {
    try {
      await createSubject(formData).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject created successfully',
          severity: 'success',
        }),
      );
      setCreateModalOpen(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to create subject',
          severity: 'error',
        }),
      );
    }
  };

  // EDIT FUNCTIONS
  const handleEdit = async (formData) => {
    try {
      const result = await updateSubject({
        id: selectedSubject.subject_id,
        formData,
      }).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject updated successfully',
          severity: 'success',
        }),
      );
      setEditModalOpen(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to update subject',
          severity: 'error',
        }),
      );
    }
  };

  // DELETE FUNCTIONS
  const handleDelete = (row) => {
    setSelectedSubject(row);
    dispatch(setModal({ open: true }));
  };

  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    try {
      await deleteSubject(selectedSubject.subject_id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to delete subject',
          severity: 'error',
        }),
      );
    }
  };

  // VIEW FUNCTIONS
  const handleView = (row) => {
    setSelectedSubject(row);
    setViewModalOpen(true);
  };

  const handleEditOpen = (row) => {
    setSelectedSubject(row);
    setEditModalOpen(true);
  };

  // DELETE MULTIPLE FUNCTIONS
  const handleSelectedDelete = async (selectedIds) => {
    try {
      await Promise.all(selectedIds.map((id) => deleteSubject(id).unwrap()));
      dispatch(
        setSnackbar({
          open: true,
          message: 'Selected subject deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to delete selected subject',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <FormComponent
      title="Subject List"
      subTitle={`Total Subjects: ${rows.length}`}
    >
      <Stack direction="row" justifyContent="flex-end">
        <StyledButton
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PlusIcon size={18} />}
          onClick={() => setCreateModalOpen(true)}
        >
          Create subject
        </StyledButton>
      </Stack>

      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        onView={handleView}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['description']}
        emptyTitle="No Subjects"
        emptySubTitle="No subjects available"
        isLoading={isLoading}
        showNO={false}
        idField="subject_id"
      />

      {/* CREATE SUBJECT MODAL */}
      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Subject"
        description="Enter the details for the new subject"
        fields={[
          {
            name: 'subject_name',
            label: 'Subject Name',
            required: true,
            icon: '',
          },
          {
            name: 'description',
            label: 'Description',
            required: true,
            multiline: true,
            icon: '',
          },
        ]}
        onSubmit={handleCreate}
        validationSchema={SubjectValidator}
        submitText={'Create Subject'}
      />

      {/* EDIT SUBJECT MODAL */}
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Update Subject"
        description="Update the subject details"
        fields={[
          {
            name: 'subject_name',
            label: 'Subject Name',
            required: true,
            icon: '',
          },
          {
            name: 'description',
            label: 'Description',
            required: true,
            multiline: true,
            icon: '',
          },
        ]}
        validationSchema={SubjectValidator}
        id={selectedSubject?.subject_id}
        getDataQuery={useGetSubjectByIdQuery}
        useUpdateDataMutation={useUpdateSubjectMutation}
        onSuccessfulUpdate={(updatedData) => {
          dispatch(
            setSnackbar({
              open: true,
              message: 'Class updated successfully',
              severity: 'success',
            }),
          );
          console.log(updatedData);
          setEditModalOpen(false);
        }}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Subject Details"
        data={selectedSubject}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={
          selectedSubject ? selectedSubject.subject_name : 'this subject'
        }
      />
    </FormComponent>
  );
}

export default SubjectListPage;
