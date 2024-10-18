import { Grid2 as Grid, Typography } from '@mui/material';

function HeaderReportTable({ schoolInfo, classInfo, startDate, endDate }) {
    const dateRange = classInfo?.date_range;
    const studentCount = classInfo?.student_count;
    console.log('this total students : ', classInfo);
    
    return <>
        <Grid  xs={12}>
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
                LIST OF STUDENTS
            </Typography>
            <Typography variant="body2" align="center">
                Attendance Report
            </Typography>
            <Typography variant="body2" align="center">
                Form {startDate ? startDate : dateRange?.start_date} To {endDate ? endDate :dateRange?.end_date}
            </Typography>
        </Grid>

        <Grid container justifyContent="space-between" style={{ marginTop: '16px' }}>
            <Grid >
                <Typography variant="body2">School name : {schoolInfo?.school_name}</Typography>
                <Typography variant="body2">Class name : {classInfo?.class_name}</Typography>
                <Typography variant="body2">Total students : {studentCount?.total_students || 0}</Typography>
                <Typography variant="body2">Female: {studentCount?.total_female || 0} / Male : {studentCount?.total_male || 0}</Typography>
            </Grid>
        </Grid>
    </>
}

export default HeaderReportTable

