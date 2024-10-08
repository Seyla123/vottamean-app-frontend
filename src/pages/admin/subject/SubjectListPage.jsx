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
} from '../../../services/subjectApi';

const tableTitles = [
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

  const handleEdit = async (formData) => {
    try {
      const result = await updateSubject({
        id: selectedSubject.subject_id,
        formData,
      }).unwrap();
      if (result.error) {
        throw new Error(result.error);
      }
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
          message:
            error.message ||
            'Failed to update subject. The subject may no longer exist.',
          severity: 'error',
        }),
      );
    }
  };

  const handleDelete = (row) => {
    setSelectedSubject(row);
    dispatch(setModal({ open: true }));
  };

  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    try {
      const result = await deleteSubject(selectedSubject.subject_id).unwrap();
      if (result.error) {
        throw new Error(result.error);
      }
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
          message:
            error.message ||
            'Failed to delete subject. The subject may no longer exist.',
          severity: 'error',
        }),
      );
    }
  };

  const handleView = (row) => {
    setSelectedSubject(row);
    setViewModalOpen(true);
  };

  const handleEditOpen = (row) => {
    setSelectedSubject(row);
    setEditModalOpen(true);
  };

  const handleSelectedDelete = async (selectedIds) => {
    try {
      const results = await Promise.all(
        selectedIds.map((id) => deleteSubject(id).unwrap()),
      );
      const failedDeletions = results.filter((result) => result.error);
      if (failedDeletions.length > 0) {
        throw new Error(
          `Failed to delete ${failedDeletions.length} subjects. They may no longer exist.`,
        );
      }
      dispatch(
        setSnackbar({
          open: true,
          message: 'Selected subjects deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            error.message || 'Failed to delete some or all selected subjects',
          severity: 'error',
        }),
      );
    }
  };

  const fields = [
    { name: 'subject_name', label: 'Subject Name', required: true },
    { name: 'description', label: 'Description', multiline: true },
  ];

  return (
    <FormComponent
      title="Subject List"
      subTitle={`Total Subjects: ${rows.length}`}
    >
      <Stack direction="row" justifyContent="flex-end">
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PlusIcon size={20} />}
          onClick={() => setCreateModalOpen(true)}
        >
          ADD SUBJECT
        </Button>
      </Stack>

      <DataTable
        rows={rows}
        columns={tableTitles}
        onView={handleView}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['description']}
        emptyTitle="No Subjects"
        emptySubTitle="No subjects available"
        isLoading={isLoading}
        showNO={false}
        idField="subject_id"
      />

      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Subject"
        description="Enter the details for the new subject"
        fields={fields}
        onSubmit={handleCreate}
      />

      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Subject"
        description="Update the details for this subject"
        fields={fields}
        initialData={selectedSubject}
        onSubmit={handleEdit}
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
