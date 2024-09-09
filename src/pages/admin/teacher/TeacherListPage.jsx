import React, { useState } from 'react';
import FormComponent from '../../../components/common/FormComponent';
import SimpleTable from '../../../components/table/SimpleTable';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function TeacherListPage() {
  const [rows, setRows] = useState([
    { id: 1, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrFried123@gmail.com', phoneNumber: '01234567' },
    { id: 2, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'mssFried123@gmail.com', phoneNumber: '01234567' },
    { id: 3, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 4, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 5, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
    { id: 6, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 7, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'mssFried123@gmail.com', phoneNumber: '01234567' },
    { id: 8, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
    { id: 9, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
  ]);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    setRows(rows.filter(item => item.id !== row.id));
  };

  const columns = [
    { field: 'lastName', headerName: 'Full Name', valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'gender', headerName: 'Gender' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
    { field: 'email', headerName: 'Email' }
  ];

  return (
    <>
      {/* Header */}
      <FormComponent title="Teacher List" subTitle="There are 9 Teachers">
        {/* Table */}
        <SimpleTable
          columns={columns}
          data={rows}
          pagination={true}
          hiddenColumns={[]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </FormComponent>
    </>
  );
}

export default TeacherListPage;
