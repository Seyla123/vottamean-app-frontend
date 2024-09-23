import { useState } from 'react';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { Link } from 'react-router-dom';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import { PlusIcon } from 'lucide-react';
import { useGetClassesDataQuery } from '../../../services/classApi'; // Adjust the import based on your project structure
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import ClassCardSkeleton from '../../../components/loading/ClassCardSkeleton';
const ClassListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch classes using the API hook
  const { data, error, isLoading } = useGetClassesDataQuery();
  if (isLoading) {
    return ClassCardSkeleton;
  }
  if (error) {
    return CircularIndeterminate;
  }
  // Ensure data is defined before mapping
  const newClassesData = data?.data
  ?.filter((item) => {
    return (
      item.class_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })
  .map((item) => {
    const { class_id, class_name, description } = item;
    return {
      class_id,
      class_name,
      description,
    };
  });

  const handleEdit = (row) => {
    navigate(`/admin/classes/update/${row.class_id}`);
  };
  
  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleSelectedDelete = () => {
    console.log('Delete all');
  };
  const handleView = (row) => {
    navigate(`/admin/classes/${row.class_id}`);
  }

  const columns = [
    { id: 'class_id', label: 'Class ID' },
    { id: 'class_name', label: 'Class Name' },
    { id: 'description', label: 'Description' },
  ];

  const hideColumns = ['description'];

  return (
    <FormComponent title="Class List" subTitle={`Total Classes: ${newClassesData.length}`}>
      {/* Button add class container */}
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/admin/classes/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD CLASS
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
      <DataTable
        rows={newClassesData}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
       onView={handleView}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={hideColumns}
        emptyTitle={'No Class'}
        emptySubTitle={'No Class Available'}
      />
    </FormComponent>
  );
};

export default ClassListPage;