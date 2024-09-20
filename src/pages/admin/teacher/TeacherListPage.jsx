import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
import FormComponent from '../../../components/common/FormComponent';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';

// Define the columns for the DataTable
const columns = [
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
];

function TeacherListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Use the query to fetch teacher data
  const { data, isLoading, error } = useGetAllTeachersQuery();
  useEffect(() => {
    if (data) {
      data;
    }
  });
  console.log('API Data:', data);
  // Access the data array from the API response
  const rows =
    data && Array.isArray(data.data)
      ? data.data.map((teacher) => ({
          id: teacher.teacher_id,
          name: `${teacher.Info.first_name} ${teacher.Info.last_name}`,
          gender: teacher.Info.gender,
          email: teacher.User.email,
          phoneNumber: teacher.Info.phone_number,
        }))
      : [];

  // handle edit to edit teacher info by its id
  const handleEdit = (row) => {
    navigate(`/admin/teachers/update/${row.id}`);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  const hideColumns = ['phoneNumber', 'email'];
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <FormComponent
      title="Teacher List"
      subTitle={`There are ${rows.length} Teachers`}
    >
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/admin/teachers/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD TEACHER
          </Button>
        </Link>
      </Stack>

      <Box>
        <Stack
          direction="row"
          justifyContent={'flex-end'}
          width={'100%'}
          gap={2}
        >
          <SearchComponent
            sx={{ width: '100%', maxWidth: '700px' }}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClickIcon={() => console.log('click search icon')}
          />
        </Stack>
      </Box>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Failed to load teachers</p>
      ) : (
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
      )}
    </FormComponent>
  );
}

export default TeacherListPage;
