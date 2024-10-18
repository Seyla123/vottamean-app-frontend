import { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import { useGetReportAttendanceByClassQuery } from "../../../../services/attendanceApi";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { shadow } from "../../../../styles/global";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Box, Paper,Button, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell } from "@mui/material";
import React, { useRef } from 'react';
const AttendanceReportPage = () => {
  const [reportData, setReportData] = useState({});
  const [toggleAttendanceKey, setToggleAttendanceKey] = useState(false);

  const filter = useSelector((state) => state.attendance.filter);
  const { data, isLoading, isError, isSuccess } = useGetReportAttendanceByClassQuery(filter);

  useEffect(() => {
    if (isSuccess) {
      setReportData(data.data);
    }
  }, [data, isSuccess]);

  const { dates, result, classes, school } = reportData;

  const emptyTitleData = {
    emptyTitle: filter.class === "" || filter.class === "all" ? "Class Required" : "No Data",
    emptySubTitle: filter.class === "" || filter.class === "all" ? "Please select a class to view attendance data" : "No attendance data available for this class",
  };
  console.log('this ', emptyTitleData);
//Utility to chunk an array into smaller arrays
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array?.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const exportToPDF = (students, dates) => {
    // Chunk the students and dates as per the given requirements
    const studentChunks = chunkArray(students, 25); // 25 students per chunk
    const dateChunks = chunkArray(dates, 7); // 7 dates per chunk
  
    console.log('this is studentChunks:', studentChunks);
    console.log('this is dateChunks:', dateChunks);
  
    const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize jsPDF for A4 Portrait format
    const pageWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm
  
    let positionY = 10; // Start with 10mm margin
  
    studentChunks.forEach((studentChunk, studentIndex) => {
      dateChunks.forEach((dateChunk, dateIndex) => {
        const canvasPromises = []; // To capture the rendered table for each page
  
        // Render the hidden table and capture it
        canvasPromises.push(
          html2canvas(document.getElementById(`pdf-page-${studentIndex}-${dateIndex}`), {
            useCORS: true,
            scale: 2,  // Scale up for better resolution
          })
        );
  
        Promise.all(canvasPromises).then((canvases) => {
          canvases.forEach((canvas, canvasIndex) => {
            const imgData = canvas.toDataURL('image/jpeg', 2.0); // Get the image data from the canvas
            const imgWidth = pageWidth - 20; // 10mm margin on both sides
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
            if (canvasIndex === 0) {
              pdf.addImage(imgData, 'JPEG', 10, positionY, imgWidth, imgHeight);
            } else {
              pdf.addPage();
              pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
            }
          });
  
          // Save the PDF
          pdf.save('attendance_report.pdf');
        });
      });
    });
  };
  

  // Component for generating the hidden content to be exported as PDF
  const PdfDownloadContent = ({ students, dates }) => {
    const fontSizeCell = '0.65rem'; // Set a smaller font size for cells

    // Split the students and dates into chunks
    const studentChunks = chunkArray(students, 10);
    const dateChunks = chunkArray(dates, 7);

    return (
      <Box sx={{ opacity: 0, position: 'absolute', left: '-99999999', zIndex: '-100000' }}>
        {studentChunks.map((studentChunk, studentIndex) => (
          dateChunks.map((dateChunk, dateIndex) => (
            <Paper
              id={`pdf-page-${studentIndex}-${dateIndex}`}
              key={`${studentIndex}-${dateIndex}`}
              sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                width: '100%',
                maxWidth: '900px',
                mx: 'auto',
                padding: 2,
                flexDirection: 'column',
                gap: 2,
                borderRadius: '1px',
                marginBottom: '20px'
              }}
            >
              <Typography variant="h6" align="center">Attendance Report</Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={3} align="center" fontSize={fontSizeCell}>No</TableCell>
                      <TableCell rowSpan={3} align="center" fontSize={fontSizeCell}>ID</TableCell>
                      <TableCell rowSpan={3} align="center" fontSize={fontSizeCell}>Full Name</TableCell>
                      {dateChunk.map((date, dateIndex) => (
                        <TableCell key={dateIndex} colSpan={date.subject.length} align="center" fontSize={fontSizeCell}>{date.date}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" fontSize={fontSizeCell}>Gender</TableCell>
                      {dateChunk.map((date, dateIndex) => (
                        <TableCell colSpan={date.subject.length} key={dateIndex} align="center" fontSize={fontSizeCell}>
                          {date.day}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {dateChunk.map((date, dateIndex) => (
                        date.subject.map((subject, subjectIndex) => (
                          <TableCell key={`${dateIndex}-${subjectIndex}`} align="center" fontSize={fontSizeCell}>{subject}</TableCell>
                        ))
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentChunk.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell align="center" fontSize={fontSizeCell}>{index + 1}</TableCell>
                        <TableCell align="center" fontSize={fontSizeCell}>{student.id}</TableCell>
                        <TableCell align="center" fontSize={fontSizeCell}>{student.fullName}</TableCell>
                        {dateChunk.map((date) => (
                          Object.keys(date.subject).map((subject) => (
                            <TableCell key={subject} align="center" fontSize={fontSizeCell}>
                              {student.attendance[date.date]?.[subject] || "-"}
                            </TableCell>
                          ))
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))
        ))}
      </Box>
    );
  };
  return (
    <FormComponent title={"Attendance Report"}>
      <Button  onClick={() => exportToPDF(result, dates)}> Exports</Button>
      <PdfDownloadContent students={result} dates={dates} />
      <Stack bgcolor={'white'} borderRadius={'8px'} sx={shadow}>
        <AttendanceTable
          dates={dates}
          result={result}
          classData={classes}
          school={school}
          toggleAttendanceKey={toggleAttendanceKey}
          isLoading={isLoading}
          emptyTitle={emptyTitleData.emptyTitle}
          emptySubTitle={emptyTitleData.emptySubTitle}
        />

      </Stack>
    </FormComponent>
  );
};

export default AttendanceReportPage;

