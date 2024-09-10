import React, { useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
const data = [
    { id: 1, name: 'John Doe', class: '10A', status: 'Present' },
    { id: 2, name: 'Jane Smith', class: '10B', status: 'Absent' },
    // Add more rows as needed
];

function TeacherAttendanceListPage() {
    const [rows, setRows] = useState(data);

    const columns = ['id', 'name', 'class'];
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
        <div>
            <AttendanceTable
                rows={rows}
                columns={columns}
                status={status}
                hideColumns={['id']}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}

export default TeacherAttendanceListPage;
