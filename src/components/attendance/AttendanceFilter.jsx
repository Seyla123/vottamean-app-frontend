import { useGetSubjectsQuery } from "../../services/subjectApi";
import { useGetClassesDataQuery } from '../../services/classApi';
import { setFilter } from "../../store/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Button } from '@mui/material';
import { DownloadIcon } from "lucide-react";
import FilterComponent from "../common/FilterComponent";
import { useEffect, useState } from "react";
import { transformedFilterSubjects, transformedFilterClasses } from "../../utils/formatData";
import { setSnackbar } from "../../store/slices/uiSlice";
import { tableShadow } from "../../styles/global";
import { Filter, BookIcon, LibraryIcon } from 'lucide-react';

const filterOptions = [
    { value: "all", label: "All" },
    { value: "today", label: "Daily" },
    { value: "lastWeek", label: "Weekly" },
    { value: "lastMonth", label: "Monthly" },
    { value: "lastYear", label: "Yearly" },
]

function AttendanceFilter({pdfData}) {
    // Get the dispatch function and the current filter state from the store
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.attendance.filter);

    // Get the data from the subject and class api
    const { data: subjectData, isSuccess: isSubjectSuccess} = useGetSubjectsQuery();
    const { data: dataClass, isSuccess: isClassSuccess} = useGetClassesDataQuery();

    // Set the initial state for the subjects and classes
    const allSelector = [{
        value: 'all',
        label: 'All'
    }]
    const [subjects, setSubjects] = useState(allSelector);
    const [classes, setClasses] = useState(allSelector);
    const [isExporting, setIsExporting] = useState(false);

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
        if(event.target.value === 'all'){
            dispatch(setFilter({ ...filter, subject: '' }));
        }else{
        dispatch(setFilter({ ...filter, subject: event.target.value }));
        }
    };

    // handle class change
    const handleClassChange = (event) => {
        if(event.target.value === 'all'){
            dispatch(setFilter({ ...filter, class: '' }));
        }else{
            dispatch(setFilter({ ...filter, class: event.target.value }));
        }
    };

    //handle filter change
    const handleFilterChange = (event) => {
        if(event.target.value === 'all'){
            dispatch(setFilter({ ...filter, filter: '' }));
        }else{
        const selectedLabel = filterOptions.find(item => item.value === event.target.value)?.label || 'All';
        dispatch(setFilter({ ...filter, filter: event.target.value, filterLabel: selectedLabel }));
        }
    };

    // handle export CSV file
    const handleExportsCsv = async () => {
        setIsExporting(true);
        console.log('Exporting CSV...',isExporting);
        
      try {
        const blob = await fetch(`${import.meta.env.VITE_API_URL}/attendance/export-attendance`,
          { credentials: 'include' }).then((res) => res.blob());          // Create a download link and auto-download the CSV file
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_data.csv');  // Filename for the CSV
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Failed to download CSV:', error);
        dispatch(setSnackbar({ open: true, message: 'Failed to download CSV', severity: 'error' }));
      }
      finally{
        setIsExporting(false);  // Reset exporting status after exporting is done.
      }
    }
    const handleDownloadPDF = () => {
        console.log('click download pdf.');
        
    }
    return (
        <Box sx={filterBoxStyle}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignSelf: "start" }}>
                <FilterComponent
                    value={filter.subject}
                    data={subjects}
                    onChange={handleSubjectChange}
                    placeholder={"Subject"}
                    customStyles={ {height: '40px'}}
                    icon={<BookIcon size={18} color='#B5B5B5'/>}
                />
                <FilterComponent
                    value={filter.class}
                    data={classes}
                    onChange={handleClassChange}
                    placeholder={"Class"}
                    customStyles={ {height: '40px'}}
                    icon={<LibraryIcon size={18} color='#B5B5B5'/>}
                />
                <FilterComponent
                    value={filter.filter}
                    data={filterOptions}
                    onChange={handleFilterChange}
                    placeholder={"Date range"}
                    customStyles={ {height: '40px'}}
                    icon={<Filter  size={18} color='#B5B5B5'/>}
                />
            </Box>
            <Box alignSelf={"end"}>
                {pdfData? <Button
                    variant="contained"
                    endIcon={isExporting ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon size={16} />}
                    disabled={isExporting}
                    onClick={handleDownloadPDF}
                    sx={{ alignSelf: "flex-end" }}
                >
                    Download PDF
                </Button> : <Button
                    variant="contained"
                    endIcon={isExporting ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon size={16} />}
                    disabled={isExporting}
                    onClick={handleExportsCsv}
                    sx={{ alignSelf: "flex-end" }}
                >
                    Export CSV
                </Button>}
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
    width: "100%",
    gap: 2,
    flexWrap: "wrap",
    backgroundColor: "white",
    height: "100%",
    px: 2,
    py:3,
    
};
