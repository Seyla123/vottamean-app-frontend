import React from 'react';
import { Button } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';


function ClassPeriodListPage() {
    const navigate = useNavigate();
    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'start', label: 'Start Time' },
        { id: 'end', label: 'End Time' },
        { id: 'period', label: 'Period' },
    ];

    const rows = [
        {
            id: 1,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 2,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 3,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 4,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 5,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 6,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 7,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 8,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 9,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 10,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 11,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 12,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 13,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
        {
            id: 14,
            start: '8:00 AM',
            end: '5:00 PM',
            period: '8h',
        },
    ];

    const handleCreate = () => {
        navigate(`/dashboard/class-periods/create`);
    };

    const handleEdit = row => {
        navigate(`/dashboard/class-periods/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    const handleSelectedDelete = () => {
        console.log('Delete all');
    };

    const hideColumns = ['start'];

    return (
        <FormComponent
            title={'Class Period List'}
            subTitle={'There are 24 Class Periods'}
        >
            <Button
                variant='contained'
                sx={{ width: '170px', mb: 2, alignSelf: 'flex-end' }}
                onClick={handleCreate}
            >
                ADD CLASS PERIOD
            </Button>

            <DataTable
                rows={rows}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
                hideColumns={hideColumns}
                emptyTitle={'No Session'}
                emptySubTitle={'No Session Available'}
            />
        </FormComponent>
    );
}

export default ClassPeriodListPage;
