import { useState } from 'react';
import {
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  TablePagination,
  Box,
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
import { shadow } from '../../styles/global';
import { useSelector } from 'react-redux';
// Styled components for Table cells
const StyledTableCell = styled(TableCell)(
  ({ theme, fontSize, maxWidth, minWidth, width }) => ({
    border: '1px solid black',
    padding: '8px', // Increased padding for better readability
    fontWeight: 'bold',
    fontSize: fontSize || '0.75rem', // Ensure readability in PDF
    color: 'black', // Set text color to black for visibility
    height: 'auto', // Allow for automatic height based on content
    textTransform: 'capitalize',
    width: width || 'auto',
    textWrap: 'nowrap',
    maxWidth,
    minWidth,
  }),
);

const AttendanceTable = ({
  dates,
  result,
  classData,
  school,
  toggleAttendanceKey,
  isLoading,
  emptyTitle,
  emptySubTitle,
  selectedClasses,
  selectedSubjects,
}) => {
  const filter = useSelector((state) => state.attendance.filter);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [isExporting, setIsExporting] = useState(false);

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
  };
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
  };
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
  };
  const convertSubjectName = (subjectName) => {
    return subjectName.slice(0, 5);
  };
  const convertGender = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'M';
      case 'female':
        return 'F';
      default:
        return '-';
    }
  };
  const renderedStatusAttendance = (attendance) => {
    return dates.map((date, index) =>
      date.subject?.map((subject, i) => (
        <StyledTableCell
          align="center"
          key={index + subject + i}
          sx={{
            color: attendanceStatusColor(
              attendance[date.date] ? attendance[date.date][subject] : '-',
            ),
          }}
        >
          {convertAttendanceStatus(
            attendance[date.date] ? attendance[date.date][subject] : '-',
          )}
        </StyledTableCell>
      )),
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportTableToXLSX = () => {
    setIsExporting(true);
    try {
      const table = document.getElementById('my-table');
      if (!table) return;
      // Convert HTML table to worksheet
      const wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
  
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, 'attendance_report.xlsx');
    } catch (error) {
      console.error('Error exporting table to XLSX :', error);
    }finally {
      setIsExporting(false);
    }
  };

  const exportPdfById = () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize jsPDF for A4 Portrait format
      const pageWidth = 210; // A4 page width in mm

      const canvasPromises = []; // To capture the rendered table for each page
      const getAll = document.querySelectorAll('#pdf-page-export');
      getAll.forEach((element) => {
        canvasPromises.push(
          html2canvas(element, {
            useCORS: true,
            scale: 2, // Scale up for better resolution
          }),
        );
      });
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
        pdf.save(`attendance_reports_class_id_${filter.class}_${filter.startDate}_${filter.endDate}.pdf`);

      });
    } catch (error) {
      console.error('export pdf error : ', error);

    } finally {
      
      setIsExporting(false);
    }
  };

  const PdfDownloadContent = ({
    students,
    dates,
    school,
    classData,
    isHide = true,
    fontSizeCell = '0.5rem',
    studentLimit,
    dateLimit,
    forPreview = false,
  }) => {
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array?.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };
    // Split the students and dates into chunks
    const studentChunks = studentLimit
      ? chunkArray(students, studentLimit)
      : chunkArray(students, students?.length);
    const dateChunks = dateLimit
      ? chunkArray(dates, dateLimit)
      : chunkArray(dates, dates?.length);

    const renderedLoopStatusAttendance = (attendance, dates) => {
      return dates.map((date, index) =>
        date.subject?.map((subject, i) => (
          <StyledTableCell
            align="center"
            key={index + subject + i}
            fontSize={fontSizeCell}
            sx={{
              color: attendanceStatusColor(
                attendance[date.date] ? attendance[date.date][subject] : '-',
              ),
            }}
          >
            {convertAttendanceStatus(
              attendance[date.date] ? attendance[date.date][subject] : '-',
            )}
          </StyledTableCell>
        )),
      );
    };
    const hideStyle = {
      position: 'fixed',
      left: '-9999px',
      opacity: 0,
      zIndex: -1000,
      width: '100%',
    };
    return (
      <Box sx={isHide ? hideStyle : {}}>
        {dateChunks.map((dateChunk, dateIndex) => {
          let number = 1;
          return studentChunks.map((studentChunk, studentIndex) => {
            return (
              <Paper
                id={!forPreview ? `pdf-page-export` : ''}
                key={`${studentIndex}-${dateIndex}`}
                sx={{
                  boxShadow: 'none',
                  width: '100%',
                  maxWidth: isHide || !forPreview ? '900px' : '100%',
                  mx: 'auto',
                  padding: 2,
                  flexDirection: 'column',
                  gap: 2,
                  borderRadius: '1px',
                }}
              >
                {studentIndex == 0 && (
                  <Stack paddingBottom={1}>
                    {' '}
                    <HeaderReportTable
                      schoolInfo={school}
                      classInfo={classData}
                      startDate={dateChunks[0][0].date}
                      endDate={dateChunks[0][dateChunks[0].length - 1].date}
                    />
                  </Stack>
                )}
                <TableContainer>
                  <Table aria-label="simple table" id="my-table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          rowSpan={3}
                          align="center"
                          fontSize={fontSizeCell}
                        >
                          No
                        </StyledTableCell>
                        <StyledTableCell
                          rowSpan={3}
                          align="center"
                          fontSize={fontSizeCell}
                        >
                          ID
                        </StyledTableCell>
                        <StyledTableCell
                          rowSpan={3}
                          align="center"
                          fontSize={fontSizeCell}
                        >
                          Full Name
                        </StyledTableCell>
                        <StyledTableCell align="center" fontSize={fontSizeCell}>
                          DATE
                        </StyledTableCell>
                        {dateChunk?.map((item, index) => (
                          <StyledTableCell
                            key={index}
                            colSpan={item.subject.length}
                            align="center"
                            fontSize={fontSizeCell}
                          >
                            {item.date}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <StyledTableCell align="center" fontSize={fontSizeCell}>
                          DAY
                        </StyledTableCell>
                        {dateChunk?.map((item, index) => (
                          <StyledTableCell
                            colSpan={item.subject.length}
                            key={index}
                            align="center"
                            fontSize={fontSizeCell}
                          >
                            {convertDayToShorthand(item.day)}
                          </StyledTableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <StyledTableCell align="center" fontSize={fontSizeCell}>
                          Gender
                        </StyledTableCell>
                        {dateChunk?.map((item, index) =>
                          item.subject?.map((subject, subjectIndex) => (
                            <StyledTableCell
                              key={`${index}-${subjectIndex}`}
                              align="center"
                              fontSize={fontSizeCell}
                              width="50px"
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {convertSubjectName(subject)}
                            </StyledTableCell>
                          )),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentChunk.map((student, index) => {
                        return (
                          <TableRow key={student.id}>
                            <StyledTableCell
                              align="center"
                              fontSize={fontSizeCell}
                              nowrap="true"
                            >
                              {number++}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              fontSize={fontSizeCell}
                              nowrap="true"
                            >
                              {student.id}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              fontSize={fontSizeCell}
                              nowrap="true"
                            >
                              {student.fullName}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              fontSize={fontSizeCell}
                              nowrap="true"
                            >
                              {convertGender(student.gender)}
                            </StyledTableCell>
                            {renderedLoopStatusAttendance(
                              student.attendance,
                              dateChunk,
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            );
          });
        })}
      </Box>
    );
  };
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <AttendanceFilter
          reportAttendance
          selectedClasses={selectedClasses}
          selectedSubjects={selectedSubjects}
        />
        <Box >
          <ExportMenu
            handleExportPDF={exportPdfById}
            handleExportXLSX={exportTableToXLSX}
            isExporting={isExporting}
          />
        </Box>
      </Stack>

      <Stack bgcolor={'white'} borderRadius={'8px'} sx={shadow}>
        <PdfDownloadContent
          students={result}
          dates={dates}
          school={school}
          classData={classData}
          studentLimit={rowsPerPage}
          dateLimit={6}
        />
        {isLoading ? (
          <LoadingCircle />
        ) : dates?.length > 0 ? (
          <>
            <Paper
              sx={{
                boxShadow: 'none',
                width: '100%',
                maxWidth:{xs: '360px',sm:'700px', md:'1000px', lg:'1000px',xl:'1500px'},
                mx: 'auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: '1px',
              }}
            >
              <HeaderReportTable schoolInfo={school} classInfo={classData} />

              <TableContainer>
                <Table aria-label="simple table" id="my-table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell rowSpan={3} align="center">
                        No
                      </StyledTableCell>
                      <StyledTableCell rowSpan={3} align="center">
                        ID
                      </StyledTableCell>
                      <StyledTableCell rowSpan={3} align="center">
                        Full Name
                      </StyledTableCell>
                      <StyledTableCell align="center">DATE</StyledTableCell>
                      {dates?.map((item, index) => (
                        <StyledTableCell
                          key={index}
                          colSpan={item.subject.length}
                          align="center"
                        >
                          {item.date}
                        </StyledTableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <StyledTableCell align="center">DAY</StyledTableCell>
                      {dates?.map((item, index) => (
                        <StyledTableCell
                          colSpan={item.subject.length}
                          key={index}
                          align="center"
                        >
                          {convertDayToShorthand(item.day)}
                        </StyledTableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <StyledTableCell align="center">Gender</StyledTableCell>
                      {dates?.map((item, index) =>
                        item.subject?.map((subject, subjectIndex) => (
                          <StyledTableCell
                            key={`${index}-${subjectIndex}`}
                            align="center"
                            width="50px"
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {convertSubjectName(subject)}
                          </StyledTableCell>
                        )),
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result
                      ?.slice(
                        (page - 1 + 1) * rowsPerPage,
                        (page + 1) * rowsPerPage,
                      )
                      .map((student, index) => (
                        <TableRow key={student.id}>
                          <StyledTableCell align="center" nowrap="true">
                            {(page - 1 + 1) * rowsPerPage + index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center" nowrap="true">
                            {student.id}
                          </StyledTableCell>
                          <StyledTableCell align="center" nowrap="true">
                            {student.fullName}
                          </StyledTableCell>
                          <StyledTableCell align="center" nowrap="true">
                            {convertGender(student.gender)}
                          </StyledTableCell>
                          {renderedStatusAttendance(student.attendance)}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {toggleAttendanceKey && <AttendanceKey />}
            </Paper>
          </>
        ) : (
          <Table>
            <TableBody>
              <EmptyTable
                columns={[]}
                emptyTitle={emptyTitle}
                emptySubTitle={emptySubTitle}
              />
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
          count={classData?.student_count?.total_students || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Student per page"
        />
      </Stack>
    </>
  );
};

export default AttendanceTable;

