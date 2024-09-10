import React, { useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';

const data = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Rith Samnang',
        class: '11B',
        gender: 'Male',
        phone: '015987654',
        address: 'Siem Reap, Cambodia',
        dob: '2004-07-22',
        status: 'Present',
    },
    {
        id: 8,
        img: 'https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        name: 'Chanthy Pich',
        class: '12A',
        gender: 'Female',
        phone: '096543210',
        address: 'Battambang, Cambodia',
        dob: '2003-11-05',
        status: 'Late',
    },
    {
        id: 11,
        img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Virak Keo',
        class: '10C',
        gender: 'Male',
        phone: '089876543',
        address: 'Kampong Cham, Cambodia',
        dob: '2006-02-18',
        status: 'Permission',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Srey Oun',
        class: '11A',
        gender: 'Female',
        phone: '010234567',
        address: 'Kampot, Cambodia',
        dob: '2004-09-30',
        status: 'Present',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Sopheap Nhem',
        class: '12B',
        gender: 'Female',
        phone: '012345678',
        address: 'Sihanoukville, Cambodia',
        dob: '2003-05-12',
        status: 'Absent',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Theary Mao',
        class: '10A',
        gender: 'Female',
        phone: '098765432',
        address: 'Kep, Cambodia',
        dob: '2006-12-03',
        status: 'Late',
    },
    {
        id: 21,
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Kunthea Chhum',
        class: '11C',
        gender: 'Female',
        phone: '011223344',
        address: 'Takeo, Cambodia',
        dob: '2004-08-17',
        status: 'Present',
    },
    {
        id: 39,
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Ratana Yim',
        class: '12C',
        gender: 'Male',
        phone: '016789012',
        address: 'Prey Veng, Cambodia',
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
        id: 'class',
        label: 'Class',
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

    const handleStatusChange = (updatedRow, newStatus) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === updatedRow.id ? { ...row, status: newStatus } : row
            )
        );
        console.log(`Changed status for ${updatedRow.name} to ${newStatus}`);
    };

    return (
        <FormComponent
            title='Attendance List'
            subTitle={`Total Students: ${rows.length} ${
                rows.length === 1 ? 'Student' : 'Students'
            }`}
        >
            <AttendanceTable
                rows={rows}
                columns={columns}
                status={status}
                hideColumns={['dob', 'address', 'phone', 'gender']}
                onStatusChange={handleStatusChange}
            />
        </FormComponent>
    );
}

export default TeacherAttendanceListPage;
