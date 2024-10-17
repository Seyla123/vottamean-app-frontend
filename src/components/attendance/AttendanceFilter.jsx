import { useGetSubjectsQuery } from '../../services/subjectApi';
import { useGetClassesDataQuery } from '../../services/classApi';
import { setFilter } from '../../store/slices/attendanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Button } from '@mui/material';
import { DownloadIcon } from 'lucide-react';
import FilterComponent from '../common/FilterComponent';
import { useEffect, useState } from 'react';
import {
  transformedFilterSubjects,
  transformedFilterClasses,
} from '../../utils/formatData';
import { setSnackbar } from '../../store/slices/uiSlice';
import { Filter, BookIcon, LibraryIcon } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'lastYear', label: 'Last Year' },
];

function AttendanceFilter({ pdfData }) {
  // Get the dispatch function and the current filter state from the store
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.attendance.filter);

  // Set the initial state for the subjects and classes
  const allSelector = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  // - subjects: the state of the subjects
  // - classes: the state of the classes
  // - isExporting: the state of the export modal
  const [subjects, setSubjects] = useState(allSelector);
  const [classes, setClasses] = useState(allSelector);
  const [isExporting, setIsExporting] = useState(false);

  // Get the data from the subject and class api
  const { data: subjectData, isSuccess: isSubjectSuccess } =
    useGetSubjectsQuery();
  const { data: dataClass, isSuccess: isClassSuccess } =
    useGetClassesDataQuery();

  // When the data is loaded, format the data and set the state
  useEffect(() => {
    if (isSubjectSuccess && isClassSuccess) {
      // Format the data to be used in the FilterComponent
      const formattedDataSubjects = transformedFilterSubjects(subjectData.data);
      const formatDataClasses = transformedFilterClasses(dataClass.data);

      // Set the state with the formatted data
      setSubjects([...allSelector, ...formattedDataSubjects]);
      setClasses([...allSelector, ...formatDataClasses]);
    }
  }, [isSubjectSuccess, isClassSuccess]);

  // handle subject change
  const handleSubjectChange = (event) => {
    if (event.target.value === 'all') {
      dispatch(setFilter({ ...filter, subject: '' }));
    } else {
      dispatch(setFilter({ ...filter, subject: event.target.value }));
    }
  };

  // handle class change
  const handleClassChange = (event) => {
    if (event.target.value === 'all') {
      dispatch(setFilter({ ...filter, class: '' }));
    } else {
      dispatch(setFilter({ ...filter, class: event.target.value }));
    }
  };

  //handle filter change
  const handleFilterChange = (event) => {
    if (event.target.value === 'all') {
      dispatch(setFilter({ ...filter, filter: '' }));
    } else {
      const selectedLabel =
        filterOptions.find((item) => item.value === event.target.value)
          ?.label || 'All';
      dispatch(
        setFilter({
          ...filter,
          filter: event.target.value,
          filterLabel: selectedLabel,
        }),
      );
    }
  };

  // handle export CSV file
  const handleExportsCsv = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams({
        subject_id: filter.subject,
        class_id: filter.class,
        filter: filter.filter,
      });
      const blob = await fetch(
        `/api/v1/attendance/export-attendance?${params.toString()}`,
        { credentials: 'include' },
      ).then((res) => res.blob()); // Create a download link and auto-download the CSV file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_data.csv'); // Filename for the CSV
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download CSV:', error);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to download CSV',
          severity: 'error',
        }),
      );
    } finally {
      setIsExporting(false); // Reset exporting status after exporting is done.
    }
  };
  return (
    <Box sx={filterBoxStyle}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignSelf: 'start',
          flexWrap: 'wrap',
        }}
      >
        <FilterComponent
          value={filter.subject}
          data={subjects}
          onChange={handleSubjectChange}
          placeholder={'Subject'}
          customStyles={{ maxHeight: '50px', width: '150px' }}
          icon={<BookIcon size={18} color="#B5B5B5" />}
        />
        <FilterComponent
          value={filter.class}
          data={classes}
          onChange={handleClassChange}
          placeholder={'Class'}
          customStyles={{ maxHeight: '50px', width: '150px' }}
          icon={<LibraryIcon size={18} color="#B5B5B5" />}
        />
        <FilterComponent
          value={filter.filter}
          data={filterOptions}
          onChange={handleFilterChange}
          placeholder={'Date range'}
          customStyles={{ maxHeight: '50px', width: '150px' }}
          icon={<Filter size={18} color="#B5B5B5" />}
        />
      </Box>
      <Box alignSelf={'end'}>
        {pdfData ? (
          <StyledButton
            variant="contained"
            color="primary"
            endIcon={
              isExporting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DownloadIcon size={16} />
              )
            }
            disabled={isExporting}
            onClick={pdfData}
            sx={{ alignSelf: 'flex-end' }}
          >
            Download PDF
          </StyledButton>
        ) : (
          <StyledButton
            variant="contained"
            endIcon={
              isExporting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DownloadIcon size={16} />
              )
            }
            disabled={isExporting}
            onClick={handleExportsCsv}
            sx={{ alignSelf: 'flex-end' }}
          >
            Export CSV
          </StyledButton>
        )}
      </Box>
    </Box>
  );
}

export default AttendanceFilter;

const filterBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: 2,
  flexWrap: 'wrap',
  backgroundColor: 'white',
  height: '100%',
  px: 2,
  py: 3,
  borderRadius: '8px',
};
