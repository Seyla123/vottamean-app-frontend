import React from 'react';
import { Button, Stack } from '@mui/material';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

function SessionListPage() {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/dashboard/class-periods/create`);
    };

    const handleEdit = row => {
        navigate(`/dashboard/sessions/update/${row.id}`);
    };

    const handleDelete = row => { };

    const handleSelectedDelete = () => { };

    const rows = [
        {
            id: 1,
            time: '7:00 - 8:00',
            day: 'Monday',
            subject: 'Math',
            class: '12A',
            teacher: 'Smey',
            action: '...',
        },
        {
            id: 2,
            time: '8:10 - 9:00',
            day: 'Tuesday',
            subject: 'Khmer',
            class: '12B',
            teacher: 'Mary',
            action: '...',
        },
        {
            id: 3,
            time: '9:10 - 10:00',
            day: 'Wednesday',
            subject: 'English',
            class: '12C',
            teacher: 'Jonh',
            action: '...',
        },
        {
            id: 4,
            time: '10:10 - 11:00',
            day: 'Thursday',
            subject: 'History',
            class: '12D',
            teacher: 'Berry',
            action: '...',
        },
        {
            id: 5,
            time: '7:10 - 8:00',
            day: 'Friday',
            subject: 'Geography',
            class: '12D',
            teacher: 'SoaPhorn',
            action: '...',
        },
        {
            id: 6,
            time: '9:10 - 10:00',
            day: 'Saturday',
            subject: 'Biology',
            class: '12D',
            teacher: 'Tomas',
            action: '...',
        },
        {
            id: 7,
            time: '11:10 - 12:00',
            day: 'Sunday',
            subject: 'Chemistry',
            class: '12D',
            teacher: 'Jerry',
            action: '...',
        },
        {
            id: 8,
            time: '7:00 - 8:00',
            day: 'Monday',
            subject: 'Math',
            class: '12A',
            teacher: 'Smey',
            action: '...',
        },
        {
            id: 9,
            time: '8:10 - 9:00',
            day: 'Tuesday',
            subject: 'Khmer',
            class: '12B',
            teacher: 'Mary',
            action: '...',
        },
        {
            id: 10,
            time: '9:10 - 10:00',
            day: 'Wednesday',
            subject: 'English',
            class: '12C',
            teacher: 'Jonh',
            action: '...',
        },
        {
            id: 11,
            time: '10:10 - 11:00',
            day: 'Thursday',
            subject: 'History',
            class: '12D',
            teacher: 'Berry',
            action: '...',
        },
        {
            id: 12,
            time: '7:10 - 8:00',
            day: 'Friday',
            subject: 'Geography',
            class: '12D',
            teacher: 'SoaPhorn',
            action: '...',
        },
        {
            id: 13,
            time: '9:10 - 10:00',
            day: 'Saturday',
            subject: 'Biology',
            class: '12D',
            teacher: 'Tomas',
            action: '...',
        },
        {
            id: 14,
            time: '11:10 - 12:00',
            day: 'Sunday',
            subject: 'Chemistry',
            class: '12D',
            teacher: 'Jerry',
            action: '...',
        },
    ];
    const columns = [
        { id: 'time', label: 'Time' },
        { id: 'day', label: 'Day' },
        { id: 'subject', label: 'Subject' },
        { id: 'class', label: 'Class' },
        { id: 'teacher', label: 'Teacher' },
    ];

    const hideColumns = ['day', 'teacher'];

    return (
        <FormComponent
            title={'Session List'}
            subTitle={'There are 24 Sessions'}
        >
            {/* button add session container */}
            <Stack direction="row" justifyContent="flex-end">
                {/* add session button */}
                <Link to="/dashboard/sessions/create">
                    <Button
                        size='large'
                        variant='contained'
                        color='primary'
                    >
                        ADD SESSION
                    </Button>
                </Link>
            </Stack>

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

export default SessionListPage;
