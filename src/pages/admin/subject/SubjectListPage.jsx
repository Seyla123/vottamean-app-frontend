import SimpleTable from "../../../components/table/SimpleTable"

function SubjectListPage() {
  return (
    <>
      <SimpleTable
      columns={[
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'credit', headerName: 'Credit' },
        { field: 'semester', headerName: 'Semester' },
        { field: 'year', headerName: 'Year' },
      ]}
      data={[
        { id: 1, name: 'English', description: 'English subject', credit: 3, semester: 1, year: 1 },
        { id: 2, name: 'Mathematics', description: 'Mathematics subject', credit: 3, semester: 1, year: 1 },
        { id: 3, name: 'Science', description: 'Science subject', credit: 3, semester: 1, year: 1 },
        { id: 4, name: 'History', description: 'History subject', credit: 3, semester: 1, year: 1 },
        { id: 5, name: 'Geography', description: 'Geography subject', credit: 3, semester: 1, year: 1 },
        { id: 6, name: 'Computer Programming', description: 'Computer Programming subject', credit: 3, semester: 2, year: 1 },
        { id: 7, name: 'Database Management', description: 'Database Management subject', credit: 3, semester: 2, year: 1 },
        { id: 8, name: 'Computer Network', description: 'Computer Network subject', credit: 3, semester: 2, year: 1 },
        { id: 9, name: 'Software Engineering', description: 'Software Engineering subject', credit: 3, semester: 2, year: 1 },
        { id: 10, name: 'Web Development', description: 'Web Development subject', credit: 3, semester: 2, year: 1 },
      ]}
      pagination={true}
      hiddenColumns={['id']}
      onEdit={(row) => console.log('Edit', row)}
      onDelete={(row) => console.log('Delete', row)}/>
    </>
  )
}

export default SubjectListPage