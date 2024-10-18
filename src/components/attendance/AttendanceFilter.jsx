import { useGetSubjectsQuery } from '../../services/subjectApi';
import { useGetClassesDataQuery } from '../../services/classApi';
import { setFilter } from '../../store/slices/attendanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Stack,
} from '@mui/material';
import FilterComponent from '../common/FilterComponent';
import { useEffect, useState } from 'react';
import {
    transformedFilterSubjects,
    transformedFilterClasses,
} from '../../utils/formatData';
import { Filter, BookIcon, LibraryIcon } from 'lucide-react';

import DateRangePicker from './DateRangePicker';


function AttendanceFilter({ reportAttendance, children }) {
    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'custom', label: 'Custom' },
        { value: 'today', label: 'Today' },
        { value: 'weekly', label: 'This Week' },
        { value: 'monthly', label: 'This Month' },
        { value: 'yearly', label: 'This Year' },
        { value: 'lastWeek', label: 'Last Week' },
        { value: 'lastMonth', label: 'Last Month' },
        { value: 'lastYear', label: 'Last Year' },
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
    // - isExporting: the state of the export modal
    const [subjects, setSubjects] = useState(allSelector);
    const [classes, setClasses] = useState(allSelector);




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

            // Set the state with the formatted data for classes.
            // If reportAttendance props is true, setClasses without all class selector,
            // otherwise with all selector and classes.
            setClasses(
                reportAttendance
                    ? formatDataClasses
                    : [...allSelector, ...formatDataClasses]
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

    const handleStartDateChange = (startDate) => {
        dispatch(setFilter({ ...filter, startDate }));
    };
    const handleEndDateChange = (endDate) => {
        dispatch(setFilter({ ...filter, endDate }));
    };

    console.log('this filter L  = ', filter);

    return (
        <Box sx={filterBoxStyle}>
            {children}
            <Stack
                sx={{
                    flexDirection: { sm: 'row', xs: 'column' },
                    gap: 2,
                    justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                }}
            >
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'start',
                        flexWrap: 'wrap',
                    }}
                >
                    <FilterComponent
                        value={filter.subject}
                        data={subjects}
                        onChange={handleSubjectChange}
                        placeholder={'Subject'}
                        customStyles={{
                            maxWidth: { sm: '150px', md: '100%' },
                            width: { sm: '150px', xs: '100%' },
                        }}
                        icon={<BookIcon size={18} color="#B5B5B5" />}
                    />
                    <FilterComponent
                        value={filter.class}
                        data={classes}
                        onChange={handleClassChange}
                        placeholder={'Class'}
                        customStyles={{
                            maxWidth: { sm: '150px', md: '100%' },
                            width: { sm: '150px', xs: '100%' },
                        }}
                        icon={<LibraryIcon size={18} color="#B5B5B5" />}
                    />
                    <FilterComponent
                        value={filter.filter}
                        data={filterOptions}
                        onChange={handleFilterChange}
                        placeholder={'Date range'}
                        customStyles={{
                            maxWidth: { sm: '150px', md: '100%' },
                            width: { sm: '150px', xs: '100%' },
                        }}
                        icon={<Filter size={18} color="#B5B5B5" />}
                    />
                </Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'end',
                        flexWrap: 'wrap',
                    }}
                >
                    {filter.filter == 'custom' && (
                        <DateRangePicker
                            onEndDateChange={handleEndDateChange}
                            onStartDateChange={handleStartDateChange}
                        />
                    )}
                </Stack>
            </Stack>
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
