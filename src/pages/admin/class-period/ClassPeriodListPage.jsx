import { useMediaQuery, Stack, Box, Button } from '@mui/material';
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

    const handleCreate = () => {
        navigate(`/dashboard/class-periods/create`);
    };

    const handleEdit = row => {
        navigate(`/dashboard/class-periods/update${row.id}1`);
    };

    const handleDelete = row => {};

    const handleSelectedDelete = () => {};

    const hideColumns = ['id'];

    return (
        <Box>
            <FormComponent
                title={'Class Period List'}
                subTitle={'There are 24 Class Periods'}
            >
                <Stack
                    sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant='contained'
                        sx={{ width: '170px' }}
                        onClick={handleCreate}
                    >
                        ADD SESSION
                    </Button>
                </Stack>

                {/* List Session */}
                <DataTable
                    rows={rows}
                    columns={columns}
                    onSelectedDelete={handleSelectedDelete}
                    hiddenColumns={hideColumns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    emptyTitle={'No Session'}
                    emptySubTitle={'No Session Available'}
                />
            </FormComponent>
        </Box>
    );
}

export default ClassPeriodListPage;

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

const paginationModel = { page: 0, pageSize: 10 };
