import React, { useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { SendIcon, DownloadIcon } from 'lucide-react';
import { tableShadow } from '../../../styles/global';

const data = [
    // {
    //     id: 21,
    //     img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     name: 'Kunthea Chhum',
    //     gender: 'F',
    //     phone: '011223344',
    //     address: 'Takeo',
    //     dob: '2004-08-17',
    //     status: 'Present',
    // },
    // {
    //     id: 39,
    //     img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     name: 'Ratana Yim',
    //     gender: 'M',
    //     phone: '016789012',
    //     address: 'Prey Veng',
    //     dob: '2003-01-25',
    //     status: 'Absent',
    // },
];

const columns = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'name',
        label: 'Name',
    },

    {
        id: 'gender',
        label: 'Gender',
    },
    {
        id: 'dob',
        label: 'DOB',
    },
    {
        id: 'phone',
        label: 'Phone',
    },
    {
        id: 'address',
        label: 'Address',
    },
];

function TeacherAttendanceListPage() {
    const [rows, setRows] = useState(data);
    const status = ['Present', 'Absent', 'Late', 'Permission'];
    const hideColumns = ['dob', 'address', 'phone'];

    const handleStatusChange = (updatedRow, newStatus) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === updatedRow.id ? { ...row, status: newStatus } : row
            )
        );
        console.log(`Changed ${updatedRow.name} to ${newStatus}`);
    };

    const handleSend = () => {
        console.log('Send');
    };

    const handleExport = () => {
        console.log('Export');
    };

    return (
        <FormComponent
            title='Attendance List'
            subTitle={`This is attendance list of ${rows.length} students`}
        >
            <Box>
                <Card sx={{ ...tableShadow }}>
                    <CardContent>
                        <Typography variant='h6'>Attendance List</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box display={'flex'} justifyContent={'end'} gap={2}>
                <Button
                    variant='outlined'
                    endIcon={<SendIcon size={16} />}
                    onClick={handleSend}
                >
                    Send List
                </Button>
                <Button
                    variant='contained'
                    endIcon={<DownloadIcon size={16} />}
                    onClick={handleExport}
                >
                    Export List
                </Button>
            </Box>
            <AttendanceTable
                rows={rows}
                columns={columns}
                status={status}
                hideColumns={hideColumns}
                onStatusChange={handleStatusChange}
            />
        </FormComponent>
    );
}

export default TeacherAttendanceListPage;
