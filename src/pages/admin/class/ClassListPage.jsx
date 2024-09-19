import React, { useState } from 'react';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import { PlusIcon } from 'lucide-react';
import { useGetClassesDataQuery } from '../../../services/classApi';

const ClassListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch classes using the API hook with pagination
  const { data, error, isLoading } = useGetClassesDataQuery({
    limit: rowsPerPage,
    page: page + 1, // API might expect 1-indexed pages
    search: searchTerm, // Include search term in the query
  });

  const handleEdit = (row) => {
    navigate(`/dashboard/classes/update/${row.id}`);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleSelectedDelete = (selectedIds) => {
    console.log('Delete selected:', selectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const columns = [
    { id: 'class_id', label: 'Class ID' },
    { id: 'class_name', label: 'Class Name' },
    { id: 'description', label: 'Description' },
  ];

  const hideColumns = ['description'];

  // Process the data when it's available
  const processedData = data?.data?.map((item) => ({
    id: item.class_id, // Ensure each row has a unique 'id' for DataTable
    class_id: item.class_id,
    class_name: item.class_name,
    description: item.description,
  })) || [];


  console.log(processedData);
  return (
    <FormComponent title="Class List" subTitle={`Total Classes: ${data?.total || 0}`}>
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/dashboard/classes/create">
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
            onChange={handleSearch}
            onClickIcon={() => console.log('click search icon')}
          />
        </Stack>
      </Box>

      {isLoading && <Typography>Loading classes...</Typography>}
      {error && <Typography>Error fetching classes: {error.toString()}</Typography>}

      {!isLoading && !error && (
        <DataTable
          rows={processedData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectedDelete={handleSelectedDelete}
          hideColumns={hideColumns}
          emptyTitle={'No Class'}
          emptySubTitle={'No Class Available'}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalCount={data?.total || 0}
        />
      )}
    </FormComponent>
  );
};

export default ClassListPage;