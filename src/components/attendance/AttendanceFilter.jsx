import { useGetSubjectsQuery } from '../../services/subjectApi';
import { useGetClassesDataQuery } from '../../services/classApi';
import { setFilter } from '../../store/slices/attendanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Stack } from '@mui/material';
import FilterComponent from '../common/FilterComponent';
import { useEffect, useState } from 'react';
import { Filter, BookIcon, LibraryIcon } from 'lucide-react';

import DateRangePicker from './DateRangePicker';
import { ensureOptionInList } from '../../utils/formatHelper';

function AttendanceFilter({
  reportAttendance,
  selectedSubjects,
  selectedClasses,
}) {
  const filterOptions = [
    { value: 'custom', label: 'Custom' },
    { value: 'today', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' },
  ];
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
  // - filterPeriod: the seletor of the date periods
  const [subjects, setSubjects] = useState(allSelector);
  const [classes, setClasses] = useState(allSelector);
  const filterPeriod = reportAttendance
    ? filterOptions
    : [...allSelector, ...filterOptions];

  // Get the data from the subject and class api
  const { data: subjectData, isSuccess: isSubjectSuccess } =
    useGetSubjectsQuery({ active: 1 });
  const { data: dataClass, isSuccess: isClassSuccess } = useGetClassesDataQuery(
    { active: 1 },
  );

  // When the data is loaded, format the data and set the state
  useEffect(() => {
    if (isSubjectSuccess && isClassSuccess) {
      // Format the data to be used in the FilterComponent
      const formattedDataSubjects = ensureOptionInList(
        subjectData?.data,
        selectedSubjects,
        'subject_id',
        'subject_name',
      );
      const formatDataClasses = ensureOptionInList(
        dataClass?.data,
        selectedClasses,
        'class_id',
        'class_name',
      );
      // Set the state with the formatted data
      setSubjects([...allSelector, ...formattedDataSubjects]);

      // Set the state with the formatted data for classes.
      // If reportAttendance props is true, setClasses without all class selector,
      // otherwise with all selector and classes.
      setClasses(
        reportAttendance
          ? formatDataClasses
          : [...allSelector, ...formatDataClasses],
      );
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
        filterPeriod.find((item) => item.value === event.target.value)?.label ||
        'All';
      dispatch(
        setFilter({
          ...filter,
          filter: event.target.value,
          filterLabel: selectedLabel,
        }),
      );
    }
  };

  const handleStartDateChange = (startDate) => {
    dispatch(setFilter({ ...filter, startDate }));
  };
  const handleEndDateChange = (endDate) => {
    dispatch(setFilter({ ...filter, endDate }));
  };

  console.log('this filter L  = ', filter);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
          <FilterComponent
            value={filter.subject}
            data={subjects}
            onChange={handleSubjectChange}
            placeholder={'Subject'}
          />
          <FilterComponent
            value={filter.class}
            data={
              reportAttendance && classes.length == 0
                ? [{ value: 'all', label: 'No class' }]
                : classes
            }
            onChange={handleClassChange}
            placeholder={'Class'}
          />
          <FilterComponent
            value={filter.filter}
            data={filterPeriod}
            onChange={handleFilterChange}
            placeholder={'Date range'}
            customStyles={{
              maxWidth: { sm: '150px', md: '100%' },
              width: { sm: '150px', xs: '100%' },
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        {filter.filter == 'custom' && (
          <DateRangePicker
            onEndDateChange={handleEndDateChange}
            onStartDateChange={handleStartDateChange}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default AttendanceFilter;
