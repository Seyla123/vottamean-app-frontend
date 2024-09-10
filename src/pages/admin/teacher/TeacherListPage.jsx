import {useState} from 'react';
import FormComponent from '../../../components/common/FormComponent';
import DataTable from '../../../components/common/DataTable';
import { Link,useNavigate } from 'react-router-dom';
import {Stack,Box,Button} from '@mui/material';
import SearchComponent from '../../../components/common/SearchComponent';
function TeacherListPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    console.log('searchTerm', searchTerm);
    const handleEdit = row => {
        navigate(`/dashboard/students/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'gender', label: 'Gender' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
    ];

    const rows = [
        {
            id: 1,
            name: 'Srey Mey',
            gender: 'Female',
            email: 'sreymey@example.com',
            phoneNumber: '1234567890',
        },
        {
            id: 2,
            name: 'Sok Vanna',
            gender: 'Male',
            email: 'sokvanna@example.com',
            phoneNumber: '0987654321',
        },
        {
            id: 3,
            name: 'Chenda Daro',
            gender: 'Male',
            email: 'chendadaro@example.com',
            phoneNumber: '0123456789',
        },
        {
            id: 4,
            name: 'Sophea Kunthea',
            gender: 'Female',
            email: 'sopheakunthea@example.com',
            phoneNumber: '0934567890',
        },
        {
            id: 5,
            name: 'Rachana Sopheak',
            gender: 'Female',
            email: 'rachanasopheak@example.com',
            phoneNumber: '0876543210',
        },
        {
            id: 6,
            name: 'Piseth Rithy',
            gender: 'Male',
            email: 'pisethrithy@example.com',
            phoneNumber: '0156784321',
        },
        {
            id: 7,
            name: 'Nita Kanha',
            gender: 'Female',
            email: 'nitakanha@example.com',
            phoneNumber: '0789123456',
        },
        {
            id: 8,
            name: 'Vireak Sovan',
            gender: 'Male',
            email: 'vireaksovan@example.com',
            phoneNumber: '0812345678',
        },
        {
            id: 9,
            name: 'Dara Srey',
            gender: 'Male',
            email: 'darasrey@example.com',
            phoneNumber: '0854321098',
        },
        {
            id: 10,
            name: 'Sokha Ratanak',
            gender: 'Female',
            email: 'sokharatanak@example.com',
            phoneNumber: '0612345789',
        },
        {
            id: 11,
            name: 'Monytha Sreypich',
            gender: 'Female',
            email: 'monythasreypich@example.com',
            phoneNumber: '0678923456',
        },
        {
            id: 12,
            name: 'Borey Chan',
            gender: 'Male',
            email: 'boreychan@example.com',
            phoneNumber: '0954321078',
        },
        {
            id: 13,
            name: 'Chakrey Dara',
            gender: 'Female',
            email: 'chakreydara@example.com',
            phoneNumber: '0887654321',
        },
        {
            id: 14,
            name: 'Rith Soben',
            gender: 'Male',
            email: 'rithsoben@example.com',
            phoneNumber: '0923456789',
        },
        {
            id: 15,
            name: 'Maly Rotha',
            gender: 'Female',
            email: 'malyrotha@example.com',
            phoneNumber: '0776543210',
        },
        {
            id: 16,
            name: 'Visal Samnang',
            gender: 'Male',
            email: 'visalsamnang@example.com',
            phoneNumber: '0834567890',
        },
        {
            id: 17,
            name: 'Nika Chanthou',
            gender: 'Female',
            email: 'nikachanthou@example.com',
            phoneNumber: '0901234567',
        },
        {
            id: 18,
            name: 'Vuthy Daravuth',
            gender: 'Male',
            email: 'vuthydaravuth@example.com',
            phoneNumber: '0654321098',
        },
        {
            id: 19,
            name: 'Pich Seyha',
            gender: 'Female',
            email: 'pichseyha@example.com',
            phoneNumber: '0867894321',
        },
        {
            id: 20,
            name: 'Sina Rith',
            gender: 'Female',
            email: 'sinarith@example.com',
            phoneNumber: '0932109876',
        },
        {
            id: 21,
            name: 'Kosal Viseth',
            gender: 'Male',
            email: 'kosalviseth@example.com',
            phoneNumber: '0812345789',
        },
    ];

    const handleSelectedDelete = () => {
        console.log('Delete all');
    };

    const hideColumns = ['name', 'phoneNumber'];

    return (
        <FormComponent title='Teacher List' subTitle='There are 9 Teachers'>
            {/* button add student container */}
            <Stack direction="row" justifyContent="flex-end">
                {/* add student button */}
                <Link to="/dashboard/teachers/create">
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                >
                    ADD TEACHER
                </Button>
                </Link>
            </Stack>

            {/* Container  */}
            <Box >
                <Stack direction="row" justifyContent={'flex-end'} width={'100%'} gap={2} >

                    {/* Search teacher */}
                    <SearchComponent
                        sx={{ width: '100%', maxWidth: '700px' }}
                        placeholder='Search'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClickIcon={() => console.log('click search icon')}
                    />
                </Stack>
            </Box>
            <DataTable
                rows={rows}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
                hideColumns={hideColumns}
                emptyTitle={'No Teacher'}
                emptySubTitle={'No Teacher Available'}
            />
        </FormComponent>
    );
}

export default TeacherListPage;
