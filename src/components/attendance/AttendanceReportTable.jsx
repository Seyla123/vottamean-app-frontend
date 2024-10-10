import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Female } from '@mui/icons-material';

// Styled components for Table cells
const StyledTableCell = styled(TableCell)(({ theme, fontSize }) => ({
  border: '1px solid black',
  padding: '4px', // Reduced padding
  fontWeight: 'bold',
  fontSize: fontSize || '10px', // Smaller font size
  height: '5px', // Reduced row height
}));


const studentsData2 = [
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/01/2024',
      day: 'Sunday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/02/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Absent',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Present',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '08',
      student_name: 'Seyla2 ',
      gender: 'M',
    },
    Attendance: {
      date: '9/03/2024',
      day: 'Tuesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/04/2024',
      day: 'Wednesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/05/2024',
      day: 'Thursday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/06/2024',
      day: 'Friday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Absent',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/07/2024',
      day: 'Saturday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/08/2024',
      day: 'Sunday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '08',
      student_name: 'Seyla2 ',
      gender: 'M',
    },
    Attendance: {
      date: '9/09/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Absent',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Present',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Absent',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/10/2024',
      day: 'Tuesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/11/2024',
      day: 'Wednesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/12/2024',
      day: 'Thursday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/13/2024',
      day: 'Friday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Absent',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/14/2024',
      day: 'Saturday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/15/2024',
      day: 'Sunday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '08',
      student_name: 'Seyla2 ',
      gender: 'M',
    },
    Attendance: {
      date: '9/16/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Absent',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Present',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Absent',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/16/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '08',
      student_name: 'Seyla2 ',
      gender: 'M',
    },
    Attendance: {
      date: '9/17/2024',
      day: 'Tuesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/18/2024',
      day: 'Wednesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/19/2024',
      day: 'Thursday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/20/2024',
      day: 'Friday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/21/2024',
      day: 'Saturday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/22/2024',
      day: 'Sunday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/23/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '08',
      student_name: 'Seyla2 ',
      gender: 'M',
    },
    Attendance: {
      date: '9/24/2024',
      day: 'Tuesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/25/2024',
      day: 'Wednesday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/26/2024',
      day: 'Thursday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/27/2024',
      day: 'Friday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/28/2024',
      day: 'Saturday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  {
    Student: {
      student_id: '09',
      student_name: 'Sey ',
      gender: 'M',
    },
    Attendance: {
      date: '9/29/2024',
      day: 'Sunday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'Web Dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },
  // Add more students or days if needed
]; // Function to shorten subject name
const studentsData = [
  {
    Student: {
      student_id: '07',
      student_name: 'Seyla ',
      gender: 'M',
    },
    Attendance: {
      date: '9/16/2024',
      day: 'Monday',
      Session: [
        {
          subject_name: 'Maths',
          status: 'Present',
          Time: '8:00-9:30',
        },
        {
          subject_name: 'web dev',
          status: 'Absent',
          Time: '9:30-10:30',
        },
        {
          subject_name: 'Khmer',
          status: 'Present',
          Time: '10:30-11:30',
        },
      ],
    },
  },

  // You can add more student objects here following the same structur
  // Add more student objects with different data as needed...
];

const dateConvertPDF = {
  class_name: 'HexCode+',
  school_name: 'above and beyond school',
  total_student: 50,
  female: 35,
  male: 15,
  Attendance: [
    {
      date: '9/16/2024',
      day: 'Monday',
      Student: [
        {
          student_id: '1',
          student_name: 'Seav Seyla',
          gender: 'Male',
          student_attendance: [
            {
              subject_name: 'Maths',
              status: 'Present',
              Time: '8:00-9:30',
            },
            {
              subject_name: 'web dev',
              status: 'Absent',
              Time: '9:30-10:30',
            },
            {
              subject_name: 'Khmer',
              status: 'Present',
              Time: '10:30-11:30',
            },
          ],
        },
        {
          student_id: '2',
          student_name: 'Seav Seyla',
          gender: 'Male',
          student_attendance: [
            {
              subject_name: 'Maths',
              status: 'Present',
              Time: '8:00-9:30',
            },
            {
              subject_name: 'web dev',
              status: 'Absent',
              Time: '9:30-10:30',
            },
            {
              subject_name: 'Khmer',
              status: 'Present',
              Time: '10:30-11:30',
            },
          ],          
        },
        {
          student_id: '3',
          student_name: 'Seav Seyla',
          gender: 'Male',
          student_attendance: [
            {
              subject_name: 'Maths',
              status: 'Present',
              Time: '8:00-9:30',
            },
            {
              subject_name: 'web dev',
              status: 'Absent',
              Time: '9:30-10:30',
            },
            {
              subject_name: 'Khmer',
              status: 'Present',
              Time: '10:30-11:30',
            },
          ],
        }
      ],
    },
  ],
};
// Function to convert status string to character
const convertStatus = (status) => {
  switch (status) {
    case 'Absent':
      return 'A';
    case 'Present':
      return 'P';
    default:
      return status;
  }
};
const AttendanceReportTable = () => {
  const isMobile = window.innerWidth < 600;
  const fontSize = isMobile ? '9px' : '10px'; // Smaller font size for mobile and desktop

  // Extract unique dates for column headers
  const uniqueDates = [
    ...new Set(studentsData.map((student) => student.Attendance.date)),
  ];

  // Function to export the entire UI, including table, to PDF
  const exportToPDF = () => {
    const exportButtons = document.getElementById('export-buttons');
    exportButtons.style.display = 'none'; // Hide buttons during export

    const input = document.getElementById('full-ui'); // Capture the full UI
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'pt', 'a4'); // Create a new PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate ratio to scale the canvas
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        canvasWidth * ratio,
        canvasHeight * ratio,
      );
      pdf.save('student-attendance.pdf'); // Save PDF

      exportButtons.style.display = 'block'; // Show buttons again
    });
  };

  // Function to convert full day to shorthand
  const convertDay = (day) => {
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

  // Function to print the UI
  const printUI = () => {
    const exportButtons = document.getElementById('export-buttons');
    exportButtons.style.display = 'none'; // Hide buttons during printing

    const printContents = document.getElementById('full-ui').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; // Restore original UI

    exportButtons.style.display = 'block'; // Show buttons again
  };

  return (
    <>
      {/* Export buttons */}
      <Grid
        container
        justifyContent="center"
        id="export-buttons"
        style={{ marginTop: '16px' }}
      >
        <Button variant="contained" color="primary" onClick={exportToPDF}>
          Export to PDF
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={printUI}
          style={{ marginLeft: '8px' }}
        >
          Print
        </Button>
      </Grid>

      <Paper elevation={2} style={{ padding: '16px' }}>
        {/* Capture the full UI for export */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          id="full-ui"
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              style={{ fontWeight: 'bold' }}
            >
              LIST ATTENDANCE STUDENTS
            </Typography>
            <Typography variant="body2" align="center">
              From 01-September-2024 To 16-September-2024
            </Typography>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            style={{ marginTop: '16px' }}
          >
            <Grid item>
              <Typography variant="body1">ANB CAMBODIA</Typography>
              <Typography variant="body1">Class Name : HexCode+</Typography>
              <Typography variant="body2">
                All STUDENTS: {studentsData.length}
              </Typography>
              <Typography variant="body2">
                Female:{' '}
                {
                  studentsData.filter(
                    (student) => student.Student.gender === 'Female',
                  ).length
                }
              </Typography>
            </Grid>
          </Grid>

          <TableContainer component={Paper} style={{ marginTop: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    rowSpan={3}
                    style={{ fontSize }}
                  >
                    Nᵒ
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    rowSpan={3}
                    style={{ fontSize }}
                  >
                    ID
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    rowSpan={3}
                    style={{ fontSize }}
                  >
                    FULL NAME
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    rowSpan={3}
                    style={{ fontSize }}
                  >
                    GENDER
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize }}>
                    DATE
                  </StyledTableCell>
                  {uniqueDates.map((date, index) => (
                    <StyledTableCell
                      align="center"
                      colSpan={3}
                      key={index}
                      style={{ fontSize }}
                    >
                      {date}
                    </StyledTableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center" style={{ fontSize }}>
                    DAY
                  </StyledTableCell>
                  {uniqueDates.map((date, index) => {
                    const day = studentsData.find(
                      (student) => student.Attendance.date === date,
                    )?.Attendance.day;
                    return (
                      <StyledTableCell
                        align="center"
                        colSpan={3}
                        key={index}
                        style={{ fontSize }}
                      >
                        {convertDay(day)}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center" style={{ fontSize }}>
                    Subject
                  </StyledTableCell>
                  {uniqueDates.map((date, dateIndex) => {
                    const sessionsForDate = studentsData
                      .filter((student) => student.Attendance.date === date)
                      .flatMap((student) =>
                        student.Attendance.Session.map(
                          (session) => session.subject_name,
                        ),
                      );
                    const uniqueTimes = [...new Set(sessionsForDate)];
                    return uniqueTimes.map((time, sessionIndex) => (
                      <StyledTableCell
                        align="center"
                        key={sessionIndex}
                        style={{ fontSize }}
                      >
                        {time}
                      </StyledTableCell>
                    ));
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsData.map((student, index) => (
                  <TableRow key={index} style={{ height: '5px' }}>
                    <StyledTableCell align="center" style={{ fontSize }}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize }}>
                      {student.Student.student_id}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize }}>
                      {student.Student.student_name}
                    </StyledTableCell>
                    {uniqueDates.map((date) => {
                      const sessionsForDate = student.Attendance.Session.map(
                        (session) => session.status,
                      );
                      return sessionsForDate.map((status, sessionIndex) => (
                        <StyledTableCell
                          align="center"
                          key={sessionIndex}
                          style={{ fontSize }}
                        >
                          {convertStatus(status)}
                        </StyledTableCell>
                      ));
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </>
  );
};

export default AttendanceReportTable;
