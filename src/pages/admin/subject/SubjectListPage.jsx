import { Stack, Button } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { useNavigate } from 'react-router-dom';

function SubjectListPage() {
    const navigate = useNavigate();

    const handleEdit = row => {
        navigate(`/dashboard/subjects/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    const handleSelectedDelete = () => {
        console.log('Delete all');
    };

    const hideColumns = ['description'];

    const columns = [
        { id: 'id', label: 'Subject ID' },
        { id: 'name', label: 'Subject Name' },
        { id: 'description', label: 'Subject Description' },
    ];

    const rows = [
        {
            id: 1,
            name: 'Potato Fried',
            description:
                'This is a subject for learning how to cook potato fried.',
        },
        {
            id: 2,
            name: 'Potato Chip',
            description:
                'This is a subject for learning how to cook potato chip.',
        },
    ];

    return (
        <FormComponent
            title='Subject List'
            subTitle='There are total 12 Subjects'
        >
            {/* Subject Create Button */}
            <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
                <Link
                    to={'/dashboard/subjects/create'}
                >
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                >
                        Add subject
                    </Button>
                </Link>
            </Stack>
            {/* List Subject */}
            <DataTable
                columns={columns}
                rows={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
                hideColumns={hideColumns}
                emptyTitle={'No Subject'}
                emptySubTitle={'No Subject Available'}
            />
        </FormComponent>
    );
}

export default SubjectListPage;
