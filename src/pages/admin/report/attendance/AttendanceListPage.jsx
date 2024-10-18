import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllAttendanceQuery,
  useDeleteAttendanceMutation,
  useDeleteManyAttendanceMutation,
} from '../../../../services/attendanceApi';
import { setModal, setSnackbar } from '../../../../store/slices/uiSlice';
import { transformAttendanceData } from '../../../../utils/formatData';
import { formatDate } from '../../../../utils/formatHelper';
import FormComponent from '../../../../components/common/FormComponent';
import AttendanceTable from '../../../../components/attendance/AttendanceListTable';
import LoadingCircle from '../../../../components/loading/LoadingCircle';
import ReportHeader from '../../../../components/attendance/ReportHeader';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';
import AttendanceFilter from '../../../../components/attendance/AttendanceFilter';
import EditModal from '../../../../components/common/EditModal';
import ViewModal from '../../../../components/common/ViewModal';
import ExportMenu from '../../../../components/attendance/ExportMenu';
import { Stack, Divider } from '@mui/material';
import { tableShadow } from './../../../../styles/global';
import { FolderPen, IdCard, Timer, MapPinHouse, School } from 'lucide-react';

const columns = [
  { id: 'name', label: 'Full Name' },
  { id: 'time', label: 'Time' },
  { id: 'subject', label: 'Subject' },
  { id: 'className', label: 'Class' },
  { id: 'address', label: 'Address' },
];

const AttendanceListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // - rows: the attendance records that are currently being displayed on the page
  const [rows, setRows] = useState([]);

  // - filter: the current filter data attendance records
  const filter = useSelector((state) => state.attendance.filter);

  // - selectedAttendance: the item that is currently being deleted
  const [selectedAttendance, setSelectedAttendance] = useState('');

  // - open: the state of the delete confirmation modal
  const { modal } = useSelector((state) => state.ui);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // - isExporting: the state of the export CSV
  const [isExporting, setIsExporting] = useState(false);

  // editModalOpen : The state of the edit subject modal
  // - viewModalOpen: the state of the view class period modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // - useGetAllAttendanceQuery: a hook that returns a function to fetch all attendance records
  const {
    data: allAttendanceData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAllAttendanceQuery({
    page: page + 1,
    limit: rowsPerPage,
    ...filter,
  });

  // - useDeleteAttendanceMutation: a hook that returns a function to delete an attendance record
  const [
    deleteAttendance,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteAttendanceMutation();

  const [
    deleteManyAttendance,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManyAttendanceMutation();
  // - when the attendance records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      setRows(formattedData);
      setTotalRows(allAttendanceData.results);
    }
  }, [allAttendanceData, isSuccess]);

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

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  // Handle edit a subject
  const handleEditOpen = (row) => {
    setSelectedAttendance(row);
    setEditModalOpen(true);
  };
  // handle delete action
  const onDelete = (row) => {
    setSelectedAttendance(row);
    dispatch(setModal({ open: true }));
  };

  // confirm delete action
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteAttendance({ id: selectedAttendance.attendanceId }).unwrap();
  };
  // handle delete multiple subjects
  const handleSelectedDelete = async (selectedIds) => {
    console.log('this select mul : ', selectedIds);
    await deleteManyAttendance(selectedIds).unwrap();
  };
  // handle view action
  const onView = (rows) => {
    // navigate(`/admin/attendance/${rows}`);
    setSelectedAttendance(rows);
    setViewModalOpen(true);
  };

  // handle export csv
  const handleExportsCsv = async () => {
    setIsExporting(true); // Set exporting status to true
    try {
        // Create URL parameters from the filter state
        const params = new URLSearchParams({
            subject_id: filter.subject,
            class_id: filter.class,
            filter: filter.filter,
        });

        // Fetch the CSV file from the server
        const blob = await fetch(
            `/api/v1/attendance/export-attendance?${params.toString()}`,
            { credentials: 'include' },
        ).then((res) => res.blob());

        // Generate a URL for the fetched CSV blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_data.csv'); // Set the download file name
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to start download
        document.body.removeChild(link); // Clean up the link element
    } catch (error) {
        // Log the error and show a snackbar with a failure message
        console.error('Failed to download CSV:', error);
        dispatch(
            setSnackbar({
                open: true,
                message: 'Failed to download CSV',
                severity: 'error',
            }),
        );
    } finally {
        setIsExporting(false); // Reset exporting status after process is complete
    }
};

  if (isLoading) {
    return <LoadingCircle />;
  }
  console.log('this is rows :', rows);

  console.log('this selected attendance : ', selectedAttendance);

  const { className, studentId, subject, time, date, name, teacherName, day, status, address } = selectedAttendance;
  const attendanceDetail = [
    {
      'Student ID': studentId,
      icon: <IdCard size={18} />,
    },
    {
      'Full Name': name,
      icon: <IdCard size={18} />,
    },
    {
      Address: address,
      icon: <MapPinHouse size={18} />,
    },
    {
      Status: status,
      icon: <FolderPen size={18} />,
    },
    {
      Class: className,
      icon: <School size={18} />,
    },
    {
      Subject: subject,
      icon: <FolderPen size={18} />,
    },
    {
      'Teach By': teacherName,
      icon: <FolderPen size={18} />,
    },
    {
      Time: `${time}, ${day}, ${formatDate(date)}`,
      icon: <Timer size={18} />,
    },
  ];

  return (
    <FormComponent>
      <ReportHeader data={rows} title={filter.filterLabel} />
      <ExportMenu
            isExporting={isExporting}
            handleExportsCsv={handleExportsCsv}
          />
      <Stack sx={tableShadow}>
        <AttendanceFilter/>
        <Divider />
        <AttendanceTable
          rows={rows}
          columns={columns}
          hideColumns={['id', 'subject', 'className', 'address']}
          handleDelete={onDelete}
          onEdit={handleEditOpen}
          handleView={onView}
          onSelectedDelete={handleSelectedDelete}
          loading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={handleChangePage}
          setRowsPerPage={handleChangeRowsPerPage}
          totalRows={totalRows}
        />
      </Stack>
      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Attendance Details"
        data={attendanceDetail}
      />
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName={'attendance'}
      />
    </FormComponent>
  );
};

export default AttendanceListPage;
