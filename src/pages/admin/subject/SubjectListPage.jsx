import { Stack, Button } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useGetSubjectsQuery } from '../../../services/subjectApi';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';

function SubjectListPage() {
  const navigate = useNavigate();
  const { data, isError, isLoading, isSuccess } = useGetSubjectsQuery();

  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }
  console.log(data.data);

  const subjectData = data.data.map((item) => {
    const { subject_id, name, description } = item;
    return {
      subject_id,
      name,
      description
    };
  });

  const handleEdit = (row) => {
    navigate(`/dashboard/subjects/update/${row.id}`);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  const tableTiles = [
    { id: 'subject_id', label: 'Subject ID' },
    { id: 'name', label: 'Subject Name' },
    { id: 'description', label: 'Subject Description' },
  ];

  return (
    <FormComponent title="Subject List" subTitle="There are total 12 Subjects">
      {/* Subject Create Button */}
      <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
        <Link to={'/dashboard/subjects/create'}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            Add subject
          </Button>
        </Link>
      </Stack>
      {/* List Subject */}
      <DataTable
        columns={tableTiles}
        rows={subjectData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={'description'}
        emptyTitle={'No Subject'}
        emptySubTitle={'No Subject Available'}
        showNO={true}
      />
    </FormComponent>
  );
}

export default SubjectListPage;
