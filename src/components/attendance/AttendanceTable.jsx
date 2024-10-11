import React, { useRef, useState} from 'react';
import {
    Grid2 as Grid,
    Stack,
    Typography,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { truncate } from '../../utils/truncate';
import HeaderReportTable from './HeaderReportTable';
import AttendanceKey from './AttendanceKey';
import { tableShadow } from '../../styles/global';
import AttendanceFilter from './AttendanceFilter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Styled components for Table cells
const StyledTableCell = styled(TableCell)(({ theme, fontSize }) => ({
    border: '1px solid black',
    padding: '8px', // Increased padding for better readability
    fontWeight: 'bold',
    fontSize: fontSize || '12px', // Ensure readability in PDF
    color: 'black', // Set text color to black for visibility
    height: 'auto', // Allow for automatic height based on content
}));

const AttendanceTable = ({ subjects, dates, result, classData, school, toggleAttendanceKey }) => {

    const convertDayToShorthand = (day) => {
        const dayMap = {
            monday: 'MON',
            tuesday: 'TUE',
            wednesday: 'WED',
            thursday: 'THU',
            friday: 'FRI',
            saturday: 'SAT',
            sunday: 'SUN',
        };
        return dayMap[day.toLowerCase()] || day.toUpperCase();
    }
    const attendanceStatusColor = (status) => {
        switch (status) {
            case 'absent':
                return '#dc3545';
            case 'present':
                return '#28a745';
            case 'permission':
                return '#007bff';
            case 'late':
                return '#fd7e14';
            default:
                return 'black';
        }
    }
    const convertAttendanceStatus = (status) => {
        switch (status) {
            case 'absent':
                return 'A';
            case 'present':
                return '✓';
            case 'permission':
                return 'P';
            case 'late':
                return 'L';
            default:
                return '-';
        }
    }
    const convertSubjectName = (subjectName) => {
        const words = subjectName.split(' ');
        const firstWord = words[0];
        if (words.length > 1) {
            return firstWord;
        }
        return truncate(firstWord, 10);
    }
    const convertGender = (gender) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return 'M';
            case 'female':
                return 'F';
            default:
                return '-';
        }
    }
    const renderedStatusAttendance = (attendance) => {
        console.log(attendance);
        return dates.map((date, index) => (
            subjects?.map((subject, i) => (
                <StyledTableCell align="center" key={index + subject + i} sx={{ color: attendanceStatusColor(attendance[date.date] ? attendance[date.date][subject] : '-') }}>{convertAttendanceStatus(attendance[date.date] ? attendance[date.date][subject] : '-')}</StyledTableCell>

            ))
        ))
    }

    const [previewOpen, setPreviewOpen] = useState(true);
    const pdfRef = useRef();

    const openPreview = () => {
        setPreviewOpen(true);
      };
    
      const closePreview = () => {
        setPreviewOpen(false);
      };
    
      const exportToPDF = () => {
        // Step 1: Capture the HTML content with a higher scale
        html2canvas(pdfRef.current, {
          useCORS: true,
          scale: 4,  // Higher scale for better resolution
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use high-quality JPEG image
          const pdf = new jsPDF('l', 'mm', 'a4'); // A4 Landscape format
      
          const imgWidth = 297 - 20; // A4 page width minus margins (10mm each side)
          const pageHeight = 210 - 20; // A4 page height minus margins (10mm each side)
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
          let heightLeft = imgHeight;
          let position = 10; // Initial position with a 10mm margin
      
          // Add the first page image
          pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
      
          // Loop for adding more pages if content overflows
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;  // Adjust for new page
            pdf.addPage();  // Create a new page
            pdf.addImage(imgData, 'JPEG', 10, position + 10, imgWidth, imgHeight); // Add image with margin
            heightLeft -= pageHeight;
          }
      
          // Step 2: Save the PDF
          pdf.save('attendance_report.pdf');  // Save PDF with the correct filename
        });
      };
      
      
      
      
      
    return (
        <>
            <AttendanceFilter pdfData={exportToPDF}/>
            {/* <Button onClick={exportToPDF}></Button> */}
        <Paper 
        ref={pdfRef}
        sx={{ backgroundColor: 'white',
            boxShadow: 'none', width: '100%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '1px',
        }}>
            <HeaderReportTable schoolInfo={school} classInfo={classData} />
            <TableContainer >
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <StyledTableCell rowSpan={3} align="center">No</StyledTableCell>
                            <StyledTableCell rowSpan={3} align="center">ID</StyledTableCell>
                            <StyledTableCell rowSpan={3} align="center">Full Name</StyledTableCell>
                            <StyledTableCell align="center" >DATE</StyledTableCell>
                            {dates?.map((item, index) => (
                                <StyledTableCell key={index} colSpan={subjects.length} align="center">{item.date}</StyledTableCell>
                            ))}

                        </TableRow>

                        <TableRow>
                            <StyledTableCell align="center" >DAY</StyledTableCell>
                            {dates?.map((item, index) => (
                                <StyledTableCell colSpan={subjects.length} key={index} align="center">
                                    {convertDayToShorthand(item.day)}
                                </StyledTableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <StyledTableCell align="center" >Subject</StyledTableCell>
                            {dates?.map((_, index) => (
                                subjects?.map((subject, subjectIndex) => (
                                    <StyledTableCell key={`${index}-${subjectIndex}`} align="center" sx={{ textTransform: "capitalize" }} >
                                        {convertSubjectName(subject)}
                                    </StyledTableCell>
                                ))
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result?.map((student, index) => (
                            <TableRow key={student.id}>
                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{student.id}</StyledTableCell>
                                <StyledTableCell align="center">{student.fullName}</StyledTableCell>
                                <StyledTableCell align="center">{convertGender(student.gender)}</StyledTableCell>
                                {renderedStatusAttendance(student.attendance)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {toggleAttendanceKey&&<AttendanceKey />}
            

        </Paper>
        </>
    );
};
export default AttendanceTable;

