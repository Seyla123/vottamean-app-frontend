import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/common/StyledMuiButton';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { PlusIcon, } from 'lucide-react';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useDeleteManyStudentsMutation,
} from '../../../services/studentApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import Grid from '@mui/material/Grid';
import {
  formatStudentsList,
  transformedFilterClasses,
} from '../../../utils/formatData';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import DataTable from '../../../components/common/DataTable';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import TitleHeader from '../../../components/common/TitleHeader';
import UpdateStudentForm from '../../../components/student/UpdateStudentForm';

const columns = [
  { id: 'name', label: 'Full Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'class', label: 'Class' },
  { id: 'Date of Birth', label: 'Date Of Birth' },
  { id: 'address', label: 'Address' },
];
const StudentListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // - rows: the student records that are currently being displayed on the page
  // - searchTerm: the search term that is currently being used to filter the table
  // - selectedClass: the id class of the filter class that is currently being selected
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // - selectedStudent: the student records that are currently being selected
  const [selectedStudent, setSelectedStudent] = useState(null);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // Set the initial state for classes
  const allSelector = [
    {
      value: 'all',
      label: 'All',
    },
  ];

  //classes : the state for filter classes
  const [classes, setClasses] = useState(allSelector);

  // open: the state of the delete confirmation moda
  const { modal } = useSelector((state) => state.ui);

  //useGetAllStudentsQuery : a hook for return function to fetch students record
  const { data, isLoading, isError, isSuccess, isFetching, error } =
    useGetAllStudentsQuery({
      search: searchTerm,
      class_id: selectedClass,
      page: page + 1,
      limit: rowsPerPage,
    });

  // useDeleteStudentMutation : a hook for return function to delete an student record
  const [
    deleteStudent,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteStudentMutation();

  //useDeleteManyStudentsMutation : a hook for return function to delete many student record
  const [
    deleteManyStudents,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManyStudentsMutation();

  //useGetClassesDataQuery : a hook for return function to fetch classes record
  const { data: classesData, isSuccess: isClassesSuccess } =
    useGetClassesDataQuery({ active: 1 });

  //  when the student records are fetched successfully, transform the data and set the classes state
  useEffect(() => {
    if (isClassesSuccess && classesData) {
      const formattedFilterClass = transformedFilterClasses(
        classesData.data,
        'class_id',
        'class_name',
      );
      setClasses([...allSelector, ...formattedFilterClass]);
    }
  }, [isClassesSuccess, classesData]);

  //  when the student records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && data) {
      const formattedStudents = formatStudentsList(data.data);

      setRows(formattedStudents);
      setTotalRows(data.results);
    }
  }, [isSuccess, data]);

  // Snackbar handling for delete operations
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
          message: deleteError.data.message || 'Failed to delete student',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data.message || 'Failed to delete students',
          severity: 'error',
        }),
      );
    }
  }, [
    dispatch,
    isDeleteError,
    isDeleteSuccess,
    isDeleting,
    isDeletingMany,
    isDeleteManyError,
    isDeleteManySuccess,
  ]);

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  //classes filter change
  const handleClassesChange = (event) => {
    if (event.target.value === 'all') {
      setSelectedClass('');
    } else {
      setSelectedClass(event.target.value);
    }
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Update clicked
  const handleEdit = (student) => {
    setSelectedStudentId(student.id);
    setIsUpdateOpen(true);
  };

  // Handle delete one clicked
  const handleDelete = (row) => {
    setSelectedStudent(row);
    dispatch(setModal({ open: true }));
  };

  // Handle confirm deletion of a single student
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteStudent(selectedStudent?.id).unwrap();
  };

  // Handle for many delete
  const handleSelectedDelete = async (selectedIds) => {
    dispatch(setModal({ open: false }));
    await deleteManyStudents(selectedIds).unwrap();
  };

  // Handle create a new student
  const handleCreate = () => {
    navigate('/admin/students/create');
  };

  // handle click view
  const handleView = (row) => {
    navigate(`/admin/students/${row.id}`);
  };

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
        <TitleHeader title={'Student'} />
        <StyledButton
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PlusIcon size={18} />}
          onClick={handleCreate}
        >
          Create Student
        </StyledButton>
      </Stack>

      <Box sx={inputBoxStyles}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <SearchComponent
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FilterComponent
              onChange={handleClassesChange}
              placeholder="Class"
              data={classes}
              value={selectedClass}
            />
          </Grid>
        </Grid>
      </Box>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSelectedDelete={handleSelectedDelete}
        isLoading={isLoading}
        emptyTitle={'No Student'}
        emptySubTitle={'No Student Available'}
        hideColumns={['address', 'Date of Birth', 'id', 'gender']}
        showNO={true}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={selectedStudent?.name}
      />
      {/* Update modal */}
      <UpdateStudentForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        studentId={selectedStudentId}
      />
    </FormComponent>
  );
};

export default StudentListPage;

const inputBoxStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: { xs: 1, sm: 2 },
  alignItems: 'center',
  width: '100%',
};
