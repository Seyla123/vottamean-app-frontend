import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import {
  useGetTeacherQuery,
  useDeleteTeacherMutation,
} from '../../../services/teacherApi';
import { setSnackbar } from '../../../store/slices/uiSlice';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { formatTeacherDetail } from '../../../utils/formatData';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

function TeacherDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formattedTeacher, setFormattedTeacher] = useState([]);

  // Get teacher information
  const { data: teacherData, isLoading, fetchError } = useGetTeacherQuery(id);
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();

  // Format teacher data and set it in the state
  useEffect(() => {
    if (teacherData) {
      setFormattedTeacher(formatTeacherDetail(teacherData));
    }
  }, [teacherData]);

  // Handle Edit
  const handleEdit = () => {
    navigate(`/admin/teachers/update/${id}`);
  };

  // Open delete confirmation modal when user clicks on delete button
  const handleDelete = () => {
    setItemToDelete(id);
    setIsOpen(true);
  };
  // Confirm delete
  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      await deleteTeacher(itemToDelete).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Teacher deleted successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/teachers');
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to delete teacher',
          severity: 'error',
        }),
      );
    }
  };
console.log('this is data teacher : ', formattedTeacher);
console.log('this is teacher data : ', teacherData);

const data = {
   Name: "John Doe",
   Age: "30",
   Location: "New York"
};
  // loading and error states
  if (isLoading || isDeleting) return <LoadingCircle />;
  if (fetchError) return <div>Error loading teacher details</div>;

  return (
    <>
      {/* Header */}
      <FormComponent
        title="Teacher Detail"
        subTitle="These are the teacher's detailed information"
      ></FormComponent>
      {/* Card Component */}
      <CardComponent
        title="Teacher Information"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={teacherData.data}
        imgUrl={teacherData.data.Info.photo}>
        {/* Card Data */}
        <CardInformation data={formattedTeacher} />
      </CardComponent>
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Teacher"
      />
    </>
  );
}

export default TeacherDetailPage;
