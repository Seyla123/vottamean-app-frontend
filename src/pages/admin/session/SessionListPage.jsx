import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useGetSessionsQuery, useDeleteSessionMutation } from '../../../services/sessionApi';
import { transformSessionsData } from '../../../utils/formatData';
import LoadingCircle from '../../../components/loading/LoadingCircle';
function SessionListPage() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetSessionsQuery();
  const [rows , setRows] = useState([]);
  useEffect(() => {
    if (data) {
      const transformedData = transformSessionsData(data.data);
      setRows(transformedData);
    }
  }, [data]);
  if (isLoading) {
    return <LoadingCircle/>;
  }
  if (error) {
    return <div>Error loading session: {error.message}</div>;
  }

  // Handle EDIT action
  const handleEdit = (row) => {
    navigate(`/admin/class-periods/update/${row.id}`);
  };

  // Handle DELETE action
  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  // Handle DELETE ALL action
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  // Handle DETAIL action
  const handleView = (row) => {
    navigate(`/admin/class-periods/${row.period_id}`);
  };

  const columns = [
    { id: 'id', label: 'ID' },
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
      subTitle={`There are ${rows.length} sessions`}
    >
      {/* button add session container */}
      <Stack direction="row" justifyContent="flex-end">
        {/* add session button */}
        <Link to="/admin/sessions/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
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
