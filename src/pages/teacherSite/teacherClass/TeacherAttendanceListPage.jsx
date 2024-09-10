import React, { useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';

const data = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Sokha Chea',
        class: '10A',
        gender: 'Male',
        phone: '012345678',
        address: 'Phnom Penh, Cambodia',
        dob: '2005-03-15',
        status: 'Present',
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Bopha Seng',
        class: '10B',
        gender: 'Female',
        phone: '098765432',
        address: 'Siem Reap, Cambodia',
        dob: '2005-03-15',
        status: 'Present',
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Dara Meas',
        class: '10A',
        gender: 'Male',
        phone: '011223344',
        address: 'Battambang, Cambodia',
        dob: '2005-11-30',
        status: 'Absent',
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Sophea Kim',
        class: '10B',
        gender: 'Female',
        phone: '077889900',
        address: 'Kampot, Cambodia',
        dob: '2005-09-10',
        status: 'Late',
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
            subTitle={`Total Students: ${rows.length}`}
        >
            <AttendanceTable
                rows={rows}
                columns={columns}
                status={status}
                hideColumns={['id']}
                onStatusChange={handleStatusChange}
            />
        </FormComponent>
    );
}

export default TeacherAttendanceListPage;
