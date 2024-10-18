import React, { useRef, useState } from 'react';
import {
    Grid2 as Grid,
    Stack,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Paper,
    Divider,
    Button,
    TablePagination,
    Box,
    Typography
} from '@mui/material';
import { styled } from '@mui/system';
import HeaderReportTable from './HeaderReportTable';
import AttendanceKey from './AttendanceKey';
import LoadingCircle from '../loading/LoadingCircle';
import AttendanceFilter from './AttendanceFilter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import EmptyTable from '../common/EmptyTable';
import ExportMenu from './ExportMenu';

// Styled components for Table cells
const StyledTableCell = styled(TableCell)(({ theme, fontSize, maxWidth, minWidth, width }) => ({
    border: '1px solid black',
    padding: '8px', // Increased padding for better readability
    fontWeight: 'bold',
    fontSize: fontSize || '0.75rem', // Ensure readability in PDF
    color: 'black', // Set text color to black for visibility
    height: 'auto', // Allow for automatic height based on content
    textTransform: "capitalize",
    width: width || 'auto',
    textWrap: 'nowrap',
    maxWidth,
    minWidth
}));



const AttendanceTable = ({ dates, result, classData, school, toggleAttendanceKey, isLoading, emptyTitle, emptySubTitle }) => {
    const pdfRef = useRef();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        return subjectName.slice(0, 5);
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
        return dates.map((date, index) => (
            date.subject?.map((subject, i) => (
                <StyledTableCell align="center" key={index + subject + i} sx={{ color: attendanceStatusColor(attendance[date.date] ? attendance[date.date][subject] : '-') }}>{convertAttendanceStatus(attendance[date.date] ? attendance[date.date][subject] : '-')}</StyledTableCell>

            ))
        ))
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const exportTableToXLSX = () => {
        const table = document.getElementById('my-table');
        if (!table) return;
        // Convert HTML table to worksheet
        const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, 'attendance_report.xlsx');
    };

    const exportPdfById = () => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize jsPDF for A4 Portrait format
        const pageWidth = 210; // A4 page width in mm

        const canvasPromises = []; // To capture the rendered table for each page
        const getAll = document.querySelectorAll("#pdf-page-export");
        getAll.forEach((element) => {
            canvasPromises.push(
                html2canvas(element, {
                    useCORS: true,
                    scale: 2,  // Scale up for better resolution
                })
            );
        })
        Promise.all(canvasPromises).then((canvases) => {
            canvases.forEach((canvas, canvasIndex) => {
                const imgData = canvas.toDataURL('image/jpeg', 2.0); // Get the image data from the canvas
                const imgWidth = pageWidth - 20; // 10mm margin on both sides
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

                if (canvasIndex === 0) {
                    pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
                } else {
                    pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
                }
            });

            // Save the PDF
            pdf.save(`loop_attendance_reports.pdf`);
        });
    };
    const PdfDownloadContent = ({ students, dates, school,classData }) => {
        const chunkArray = (array, size) => {
            const result = [];
            for (let i = 0; i < array?.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        };
        const fontSizeCell = '0.5rem'; // Set a smaller font size for cells
        // Split the students and dates into chunks
        const studentChunks = chunkArray(students, 25);
        const dateChunks = chunkArray(dates, 7);
    
        const renderedLoopStatusAttendance = (attendance, dates) => {
            return dates.map((date, index) => (
                date.subject?.map((subject, i) => (
                    <StyledTableCell align="center" key={index + subject + i} fontSize={fontSizeCell} sx={{ color: attendanceStatusColor(attendance[date.date] ? attendance[date.date][subject] : '-') }}>{convertAttendanceStatus(attendance[date.date] ? attendance[date.date][subject] : '-')}</StyledTableCell>
    
                ))
            ))
        }
    
        return (
            <Box >
                {
                    dateChunks.map((dateChunk, dateIndex) => {
                        let number = 1;
                        return studentChunks.map((studentChunk, studentIndex) => {
                            return (
                                <Paper
                                    id={`pdf-page-export`}
                                    key={`${studentIndex}-${dateIndex}`}
                                    sx={{
                                        backgroundColor: 'white',
                                        boxShadow: 'none', width: '100%', maxWidth: '900px', mx: 'auto', padding: 2, flexDirection: 'column', gap: 2, borderRadius: '1px',
                                    }}>
                                    {studentIndex == 0 && <Stack paddingBottom={1}> <HeaderReportTable schoolInfo={school} classInfo={classData} /></Stack>}
                                    <TableContainer>
                                        <Table aria-label="simple table" id="my-table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell rowSpan={3} align="center" fontSize={fontSizeCell}>No</StyledTableCell>
                                                    <StyledTableCell rowSpan={3} align="center" fontSize={fontSizeCell}>ID</StyledTableCell>
                                                    <StyledTableCell rowSpan={3} align="center" fontSize={fontSizeCell}>Full Name</StyledTableCell>
                                                    <StyledTableCell align="center" fontSize={fontSizeCell}>DATE</StyledTableCell>
                                                    {
                                                        dateChunk?.map((item, index) => (
                                                            <StyledTableCell key={index} colSpan={item.subject.length} align="center" fontSize={fontSizeCell}>{item.date}</StyledTableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                                <TableRow>
                                                    <StyledTableCell align="center" fontSize={fontSizeCell}>DAY</StyledTableCell>
                                                    {
                                                        dateChunk?.map((item, index) => (
                                                            <StyledTableCell colSpan={item.subject.length} key={index} align="center" fontSize={fontSizeCell}>
                                                                {convertDayToShorthand(item.day)}
                                                            </StyledTableCell>
                                                        ))
                                                    }
                                                </TableRow>
    
                                                <TableRow>
                                                    <StyledTableCell align="center" fontSize={fontSizeCell}>Gender</StyledTableCell>
                                                    {dateChunk?.map((item, index) => (
                                                        item.subject?.map((subject, subjectIndex) => (
                                                            <StyledTableCell key={`${index}-${subjectIndex}`} align="center" fontSize={fontSizeCell} width="50px" sx={{ textTransform: "capitalize" }}>
                                                                {convertSubjectName(subject)}
                                                            </StyledTableCell>
                                                        ))
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {studentChunk.map((student, index) => {
                                                    return (
                                                        <TableRow key={student.id}>
                                                            <StyledTableCell align="center" fontSize={fontSizeCell} nowrap="true">{number++}</StyledTableCell>
                                                            <StyledTableCell align="center" fontSize={fontSizeCell} nowrap="true">{student.id}</StyledTableCell>
                                                            <StyledTableCell align="center" fontSize={fontSizeCell} nowrap="true">{student.fullName}</StyledTableCell>
                                                            {renderedLoopStatusAttendance(student.attendance, dateChunk)}
    
                                                            <StyledTableCell align="center" fontSize={fontSizeCell} nowrap="true">{convertGender(student.gender)}</StyledTableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            )
                        })
                    })
                }
            </Box>
        );
    };
    return (
        <>

            <AttendanceFilter reportAttendance>
                {/* <ExportMenu handleExportPDF={exportToPDF} handleExportXLSX={exportTableToXLSX} /> */}
                <ExportMenu handleExportPDF={exportPdfById} handleExportXLSX={exportTableToXLSX} />
            </AttendanceFilter>
            <PdfDownloadContent students={result} dates={dates} school={school} classData={classData}/>
            <Divider />
            {isLoading ? <LoadingCircle />
                :
                dates?.length > 0 ?
                    (<Paper

                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 'none', width: '100%', mx: 'auto', padding: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '1px',
                        }}>
                        <HeaderReportTable schoolInfo={school} classInfo={classData} />

                        <TableContainer >
                            <Table aria-label="simple table" id="my-table" >
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell rowSpan={3} align="center">No</StyledTableCell>
                                        <StyledTableCell rowSpan={3} align="center">ID</StyledTableCell>
                                        <StyledTableCell rowSpan={3} align="center">Full Name</StyledTableCell>
                                        <StyledTableCell align="center" >DATE</StyledTableCell>
                                        {dates?.map((item, index) => (
                                            <StyledTableCell key={index} colSpan={item.subject.length} align="center">{item.date}</StyledTableCell>
                                        ))}

                                    </TableRow>

                                    <TableRow>
                                        <StyledTableCell align="center" >DAY</StyledTableCell>
                                        {dates?.map((item, index) => (
                                            <StyledTableCell colSpan={item.subject.length} key={index} align="center">
                                                {convertDayToShorthand(item.day)}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <StyledTableCell align="center" >Gender</StyledTableCell>
                                        {dates?.map((item, index) => (
                                            item.subject?.map((subject, subjectIndex) => (
                                                <StyledTableCell key={`${index}-${subjectIndex}`} align="center" width="50px" sx={{ textTransform: "capitalize" }}>
                                                    {convertSubjectName(subject)}
                                                </StyledTableCell>
                                            ))
                                        ))}

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {result?.slice((page - 1 + 1) * rowsPerPage, (page + 1) * rowsPerPage).map((student, index) => (
                                        <TableRow key={student.id}>
                                            <StyledTableCell align="center" nowrap="true">{(page - 1 + 1) * rowsPerPage + index + 1}</StyledTableCell>
                                            <StyledTableCell align="center" nowrap="true">{student.id}</StyledTableCell>
                                            <StyledTableCell align="center" nowrap="true" >{student.fullName}</StyledTableCell>
                                            <StyledTableCell align="center" nowrap="true" >{convertGender(student.gender)}</StyledTableCell>
                                            {renderedStatusAttendance(student.attendance)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {toggleAttendanceKey && <AttendanceKey />}
                    </Paper>)
                    :
                    <Table>
                        <TableBody >
                            <EmptyTable columns={[]} emptyTitle={emptyTitle} emptySubTitle={emptySubTitle} />
                        </TableBody>
                    </Table>
            }
            <Divider />
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                count={classData?.student_count?.total_students || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default AttendanceTable;

// Component for generating the hidden content to be exported as PDF