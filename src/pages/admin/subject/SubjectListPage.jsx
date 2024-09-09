import { useMediaQuery, Stack, Button } from '@mui/material';
import FormComponent from "../../../components/common/FormComponent";
import SimpleTable from "../../../components/table/SimpleTable";
import { Link } from 'react-router-dom';
function SubjectListPage() {
  const subject = Array.from({length: 20}).map((v, i) => ({
    id: i + 1,
    name: `${i + 1}. Subject`,
    description: `${i + 1}. Subject Description`
  }))
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <FormComponent title="Subject List" subTitle="There are total 12 Subjects">
      {/* Subject Create Button */}
      <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
        <Link to={'/dashboard/subjects/create'} style={{ textDecoration: 'none' }}>
          <Button variant="contained" textTransform={'capitalize'} sx={{fontSize:{xs:'14px',md:'16px'}}}>add subject</Button>
        </Link>
      </Stack>
      {/* List Subject */}
      <SimpleTable
        columns={[{ field: 'id', headerName: 'Subject ID' }, { field: 'name', headerName: 'Subject Name' }, { field: 'description', headerName: 'Description' }]}
        data={subject}
        pagination={true}
        hiddenColumns={isMobile ? ['description'] : []}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
      />
    </FormComponent>
  )
}

export default SubjectListPage
