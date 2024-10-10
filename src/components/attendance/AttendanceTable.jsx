import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { styled } from '@mui/system';
const attendanceData = [
  {
    id: '07',
    student_name: 'Seyla',
    gender: 'M',
    attendance: {
      '2024-09-16': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P'},
      '2024-09-17': { 'Maths': 'P', 'WebDev': 'P', 'Khmer': 'P' },
      '2024-09-18': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P' },
      '2024-09-19': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P' }
    }
  },
  {
    id: '08',
    student_name: 'Seyla2',
    gender: 'M',
    attendance: {
      '2024-09-16': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P'},
      '2024-09-17': { 'Maths': 'P', 'WebDev': 'P', 'Khmer': 'P' },
      '2024-09-18': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P' },
      '2024-09-19': { 'Maths': 'P', 'WebDev': 'A', 'Khmer': 'P' }
    }
  }
];
// Styled components for Table cells
const StyledTableCell = styled(TableCell)(({ theme, fontSize }) => ({
    border: '1px solid black',
    padding: '4px', // Reduced padding
    fontWeight: 'bold',
    fontSize: fontSize || '10px', // Smaller font size
    height: '5px', // Reduced row height
  }));

const AttendanceTable = () => {
  const dates = [
    { date: '2024-09-16', day: 'MONDAY' },
    { date: '2024-09-17', day: 'TUESDAY' },
    { date: '2024-09-18', day: 'WEDNESDAY' },
    { date: '2024-09-19', day: 'THURSDAY' }
  ]; // You can dynamically extract these from the data
  const subject = ['Maths', 'Web Dev', 'Khmer'];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead >
          <TableRow >
            <StyledTableCell rowSpan={3} align="center">No</StyledTableCell>
            <StyledTableCell rowSpan={3} align="center">ID</StyledTableCell>
            <StyledTableCell rowSpan={3} align="center">Full Name</StyledTableCell>
          <StyledTableCell align="center" >DATE</StyledTableCell>
          {dates.map((item, index) => (
              <StyledTableCell key={index} colSpan="3" align="center">{item.date}</StyledTableCell>
            ))}
            
          </TableRow>
          
          <TableRow>
            <StyledTableCell StyledTableCell align="center" >DAY</StyledTableCell>
                {dates.map((item, index) => (
                  <StyledTableCell colSpan={3} key={index} align="center" >
                    {item.day}
                  </StyledTableCell>
                ))}
          </TableRow>
          
          <TableRow>
                <StyledTableCell StyledTableCell align="center" >Subject</StyledTableCell>
                {dates.map((_, index)=>(
                 subject.map((subject)=>(
                  <StyledTableCell key={index} align="center" >
                    {subject}
                  </StyledTableCell>
                 ))
                ))}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.student_name}</TableCell>
              <TableCell align="center">{student.gender}</TableCell>
              {dates.map(date => (
                <TableCell align="center">{student.attendance[date.date] ? student.attendance[date.date][subject[0]] : '-'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const renderAttendanceStatus = (student, dates, subject) => (
  dates.map(date => (
    <TableCell align="center">{student.attendance[date.date] ? student.attendance[date.date][subject[0]] : '-'}</TableCell>
  ))
);
export default AttendanceTable;

