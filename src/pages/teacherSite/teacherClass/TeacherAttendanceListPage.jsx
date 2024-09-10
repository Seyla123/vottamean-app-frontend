import React, { useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { SendIcon, DownloadIcon } from 'lucide-react';
import { tableShadow } from '../../../styles/global';

const data = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Rith Samnang',
        gender: 'M',
        phone: '015987654',
        address: 'Siem Reap',
        dob: '2004-07-22',
        status: 'Present',
    },
    {
        id: 8,
        img: 'https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        name: 'Chanthy Pich',
        gender: 'F',
        phone: '096543210',
        address: 'Battambang',
        dob: '2003-11-05',
        status: 'Late',
    },
    {
        id: 11,
        img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Virak Keo',
        gender: 'M',
        phone: '089876543',
        address: 'Kampong Cham',
        dob: '2006-02-18',
        status: 'Permission',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Srey Oun',
        gender: 'F',
        phone: '010234567',
        address: 'Kampot',
        dob: '2004-09-30',
        status: 'Present',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Sopheap Nhem',
        gender: 'F',
        phone: '012345678',
        address: 'Sihanoukville',
        dob: '2003-05-12',
        status: 'Absent',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Theary Mao',
        gender: 'F',
        phone: '098765432',
        address: 'Kep',
        dob: '2006-12-03',
        status: 'Late',
    },
    {
        id: 21,
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Kunthea Chhum',
        gender: 'F',
        phone: '011223344',
        address: 'Takeo',
        dob: '2004-08-17',
        status: 'Present',
    },
    {
        id: 39,
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Ratana Yim',
        gender: 'M',
        phone: '016789012',
        address: 'Prey Veng',
        dob: '2003-01-25',
        status: 'Absent',
    },
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
