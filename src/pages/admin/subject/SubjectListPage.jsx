import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { Book, Calendar, LetterText, PlusIcon } from 'lucide-react';
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
import { formatDate } from '../../../utils/formatHelper';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import TitleHeader from '../../../components/common/TitleHeader';

const columns = [
  { id: 'subject_name', label: 'Subject Name' },
  { id: 'description', label: 'Description' },
];

function SubjectListPage() {
  const dispatch = useDispatch();

  // rows : The data to be displayed in the table
  const [rows, setRows] = useState([]);

  // selectedSubject : The selected subject that currently selected
  const [selectedSubject, setSelectedSubject] = useState('');

  // createModalOpen : The state of the create subject modal
  // editModalOpen : The state of the edit subject modal
  // viewModalOpen : The state of the view subject modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // open: the state of the modal
  const { modal } = useSelector((state) => state.ui);

  // useGetSubjectsQuery : a hook that returns a function to fetch all subject records
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetSubjectsQuery({ active: 1, page: page + 1, limit: rowsPerPage });

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
      setTotalRows(data.results);
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

  // when create is failed, show a snackbar with an error message
  // when create is successful, show a snackbar with a success message and close the create modal
  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject created successfully',
          severity: 'success',
        }),
      );
      setCreateModalOpen(false);
    } else if (isCreateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: createError.data?.message || 'Failed to create subject',
          severity: 'error',
        }),
      );
    }
  }, [isCreateError, isCreateSuccess, dispatch]);

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

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
  const { subject_name, description, createdAt } = selectedSubject;

  // subject data details
  const subjectDataDetails = [
    {
      'Subject name': subject_name,
      icon: <Book size={18} />,
    },
    {
      Description: description || 'N/A',
      icon: <LetterText size={18} />,
    },
    { 'Created at': formatDate(createdAt), icon: <Calendar size={18} /> },
  ];
  const subjectFields = [
    {
      name: 'subject_name',
      label: 'Subject Name',
      type: 'text',
      placeholder: 'Enter subject name',
      required: true,
      icon: '',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter subject description',
      multiline: true,
      minRows: 4,
      icon: '',
    },
  ];

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <FormComponent>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={'center'}
      >
        <TitleHeader title={'Subject'} />
        <StyledButton
          variant="contained"
          color="primary"
          size="small"
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
        showNO={true}
        idField="subject_id"
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
      />

      {/* CREATE SUBJECT MODAL */}
      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Subject"
        description="Enter the details for the new subject"
        fields={subjectFields}
        onSubmit={handleCreate}
        validationSchema={SubjectValidator}
        submitText={'Create Subject'}
        isLoading={isCreating}
      />

      {/* EDIT SUBJECT MODAL */}
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Update Subject"
        description="Update the subject details"
        fields={subjectFields}
        validationSchema={SubjectValidator}
        id={selectedSubject?.subject_id}
        getDataQuery={useGetSubjectByIdQuery}
        useUpdateDataMutation={useUpdateSubjectMutation}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Subject Details"
        data={subjectDataDetails}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={
          selectedSubject ? selectedSubject?.subject_name : 'this subject'
        }
      />
    </FormComponent>
  );
}

export default SubjectListPage;
