import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import StyledButton from '../../../components/common/StyledMuiButton';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { PlusIcon } from 'lucide-react';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useDeleteManyStudentsMutation,
} from '../../../services/studentApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  formatStudentsList,
  transformedFilterClasses,
} from '../../../utils/formatData';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import DataTable from '../../../components/common/DataTable';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { BookIcon } from 'lucide-react';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import CreateStudentModal from '../../../components/common/CreateStudentModal';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'Date of Birth', label: 'Date Of Birth' },
  { id: 'class', label: 'Class Name' },
  { id: 'address', label: 'Address' },
];
const StudentListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setOpen(true);
  };

  const handleCreateModalClose = () => {
    setOpen(false);
  };

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
    useGetClassesDataQuery();

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

  // Handle for goes to edit page
  const handleEdit = (row) => {
    navigate(`/admin/students/update/${row.id}`);
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

  // handle click view
  const handleView = (row) => {
    navigate(`/admin/students/${row.id}`);
  };

  //Loading Data
  if (isLoading) {
    return <LoadingCircle />;
  }

  //If error occurs
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <Box>
      <FormComponent
        title={'Student Lists'}
        subTitle={`Total Students : ${data.results} `}
      >
        <Stack direction="row" justifyContent="flex-end">
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
            onClick={handleCreateModalOpen}
          >
            Create Student
          </StyledButton>
        </Stack>

        <Box sx={inputBoxStyles}>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            width={'100%'}
            gap={2}
          >
            <FilterComponent
              onChange={handleClassesChange}
              placeholder="Class"
              data={classes}
              value={selectedClass}
              customStyles={{ maxHeight: '50px', width: '150px' }}
              icon={<BookIcon size={18} color="#B5B5B5" />}
            />

            <SearchComponent
              sx={{ width: '100%', maxWidth: '700px' }}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Stack>
        </Box>
        <DataTable
          rows={rows}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onSelectedDelete={handleSelectedDelete}
          isLoading={isFetching || isLoading}
          emptyTitle={'No Student'}
          emptySubTitle={'No Student Available'}
          hideColumns={['address', 'Date of Birth']}
          showNO={false}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={handleChangePage}
          setRowsPerPage={handleChangeRowsPerPage}
          totalRows={totalRows}
        />

        <CreateStudentModal
          open={open}
          handleCreateModalClose={handleCreateModalClose}
        />

        <DeleteConfirmationModal
          open={modal.open}
          onClose={() => dispatch(setModal({ open: false }))}
          onConfirm={handleDeleteConfirmed}
          itemName={selectedStudent?.name}
        />
      </FormComponent>
    </Box>
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
