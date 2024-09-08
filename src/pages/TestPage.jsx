import React from 'react';
import SimpleTable from '../components/table/SimpleTable';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
    { field: 'email', headerName: 'Email' },
];

const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
    { id: 3, name: 'Sam Green', age: 45, email: 'sam@example.com' },
];

const handleRowClick = row => {
    console.log('Row clicked:', row);
};

const TestPage = () => {
    return (
        <SimpleTable
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            pagination
            hiddenColumns={['email', 'age']}
        />
    );
};

export default TestPage;
