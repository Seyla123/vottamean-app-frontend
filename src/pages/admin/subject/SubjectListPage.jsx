import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { FolderPen, IdCard, LetterText, PlusIcon, Timer } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
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
  useDeleteManySubjectsMutation,
} from '../../../services/subjectApi';
import { SubjectValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';
import {
  formatDate,
} from '../../../utils/formatHelper';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

const columns = [
  { id: 'subject_id', label: 'Subject ID' },
  { id: 'subject_name', label: 'Subject Name' },
  { id: 'description', label: 'Subject Description' },
];

function SubjectListPage() {
  const dispatch = useDispatch();

  // rows : The data to be displayed in the table
  const [rows, setRows] = useState([]);

  // selectedSubject : The selected subject to be edited or viewed
  const [selectedSubject, setSelectedSubject] = useState('');

  // createModalOpen : The state of the create subject modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // editModalOpen : The state of the edit subject modal
  const [editModalOpen, setEditModalOpen] = useState(false);

  // viewModalOpen : The state of the view subject modal
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // open: the state of the modal
  const { modal } = useSelector((state) => state.ui);

  // useGetSubjectsQuery : a hook that returns a function to fetch all subject records
  const { data, isLoading, isSuccess, isError } = useGetSubjectsQuery();

  // useDeleteManySubjectsMutation : a hook that returns a function to delete many subjects record
  const [
    deleteManySubjects,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManySubjectsMutation();

  // useDeleteSubjectMutation : a hook that returns a function to delete many subjects
  const [
    deleteSubject,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteSubjectMutation();

  //useCreateSubjectMutation : a hook that returns a function to create a subject record
  const [
    createSubject,
    {
      isLoading: isCreating,
      isSuccess: isCreateSuccess,
      error: createError,
      isError: isCreateError,
    },
  ] = useCreateSubjectMutation();

  // when the subjects records are fetched successfully, set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      setRows(data.data);
    }
  }, [data, isSuccess]);

  // when delete is in progress, show a snackbar with a message "Deleting..."
  // when delete is failed, show a snackbar with an error message
  // when delete is successful, show a snackbar with a success message
  useEffect(() => {
    if (isDeleting || isDeletingMany) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteSuccess || isDeleteManySuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteError.data?.message || 'Failed to delete subject',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data?.message || 'Failed to delete subjects',
          severity: 'error',
        }),
      );
    }
  }, [
    isDeleting,
    isDeleteError,
    isDeleteSuccess,
    deleteError,
    isDeletingMany,
    isDeleteManyError,
    deleteManyError,
    dispatch,
  ]);

  // when create is in progress, show a snackbar with a message "Creating..."
  // when create is failed, show a snackbar with an error message
  // when create is successful, show a snackbar with a success message and close the create modal
  useEffect(() => {
    if (isCreating) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating...',
          severity: 'info',
        }),
      );
      setCreateModalOpen(false);
    } else if (isCreateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject created successfully',
          severity: 'success',
        }),
      );
      setEditModalOpen(false);
    } else if (isCreateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: createError.data?.message || 'Failed to create subject',
          severity: 'error',
        }),
      );
    }
  }, [isCreateError, isCreateSuccess, isCreating, dispatch]);

  // Handle create a new subject
  const handleCreate = async (formData) => {
    await createSubject(formData).unwrap();
  };

  // Handle click delete subject
  const handleDelete = (row) => {
    setSelectedSubject(row);
    dispatch(setModal({ open: true }));
  };

  // Handle delete a subject confirmed
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteSubject(selectedSubject.subject_id).unwrap();
  };

  // Handle view a subject
  const handleView = (row) => {
    setSelectedSubject(row);
    setViewModalOpen(true);
  };

  // Handle edit a subject
  const handleEditOpen = (row) => {
    setSelectedSubject(row);
    setEditModalOpen(true);
  };

  // handle delete multiple subjects
  const handleSelectedDelete = async (selectedIds) => {
    await deleteManySubjects(selectedIds).unwrap();
  };
  // Get the selected subject details
  const { subject_id, subject_name, description, updatedAt } = selectedSubject;

  // subject data details
  const subjectDataDetails = [
    {
      'Subject ID': subject_id,
      icon: <IdCard size={18} />,
    },
    {
      'Subject Name': subject_name,
      icon: <FolderPen size={18} />,
    },
    {
      Description: description,
      icon: <LetterText size={18} />,
    },
    { 'Updated At': formatDate(updatedAt), icon: <Timer size={18} /> },
  ];

  // if data is loading, show a loading circle
  if (isLoading) {
    return <LoadingCircle />;
  }

  // if there is an error
  if (isError) {
    return <SomethingWentWrong />;
  }

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
          setEditModalOpen(false);
        }}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Subject Details"
        description={`These are Subject's information`}
        data={subjectDataDetails}
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
