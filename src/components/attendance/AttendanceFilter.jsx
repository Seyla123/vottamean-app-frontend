import { useGetSubjectsQuery } from "../../services/subjectApi";
import { useGetClassesDataQuery } from '../../services/classApi';
import { setFilter } from "../../store/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box } from '@mui/material';
import FilterComponent from "../common/FilterComponent";
import { useEffect, useState } from "react";
import { transformedFilterSubjects, transformedFilterClasses } from "../../utils/formatData";

const filterOptions = [
    { value: "all", label: "All" },
    { value: "today", label: "Daily" },
    { value: "lastWeek", label: "Weekly" },
    { value: "lastMonth", label: "Monthly" },
    { value: "lastYear", label: "Yearly" },
]

function AttendanceFilter() {
    // Get the dispatch function and the current filter state from the store
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.attendance.filter);

    // Get the data from the subject and class api
    const { data: subjectData, isSuccess: isSubjectSuccess, isLoading:isSubjectLoading, isError:isSubjectError } = useGetSubjectsQuery();
    const { data: dataClass, isSuccess: isClassSuccess, isLoading:isClassLoading, isError:isClassError } = useGetClassesDataQuery();

    // Set the initial state for the subjects and classes
    const allSelector = [{
        value: '',
        label: 'All'
    }]
    const [subjects, setSubjects ] = useState(allSelector);
    const [classes, setClasses ] = useState(allSelector);

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
        dispatch(setFilter({ ...filter, subject: event.target.value }));
    };

    // handle class change
    const handleClassChange = (event) => {
        dispatch(setFilter({ ...filter, class: event.target.value }));
    };

    //handle filter change
    const handleFilterChange = (event) => {
        const selectedLabel = filterOptions.find(item => item.value === event.target.value)?.label || 'All';
        dispatch(setFilter({ ...filter, filter: event.target.value, filterLabel: selectedLabel }));
    };
    
    return (
        <Box sx={filterBoxStyle}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignSelf: "start" }}>
                <FilterComponent
                    value={filter.subject}
                    data={subjects}
                    onChange={handleSubjectChange}
                    placeholder={"By Subject"}
                />
                <FilterComponent
                    value={filter.class}
                    data={classes}
                    onChange={handleClassChange}
                    placeholder={"By Class"}
                />
            </Box>
            <Box alignSelf={"end"}>
                <FilterComponent
                    value={filter.filter}
                    data={filterOptions}
                    onChange={handleFilterChange}
                    placeholder={"Filter"}
                />
            </Box>
        </Box>
    )
}

export default AttendanceFilter;

const filterBoxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    width: "100%",
    gap: 2,
};