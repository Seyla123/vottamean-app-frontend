import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from '../../../components/common/CardComponent';
import { Typography, Stack, TextField, Alert, Snackbar } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  useGetClassesByIdQuery,
  useUpdateClassesDataMutation,
} from '../../../services/classApi';
import { setSnackbar } from '../../../store/slices/classSlice';

function ClassUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { snackbar } = useSelector((state) => state.classes);
  // Fetch class data by ID
  const { data, isLoading, fetchError } = useGetClassesByIdQuery(id);

  // Local state for form data, initialized with the fetched class data
  const [formData, setFormData] = useState({
    class_name: '',
    description: '',
  });

  // Mutation hook for updating class data
  const [updateClassesData, { isUpdating, updateError }] =
    useUpdateClassesDataMutation();

  // Update local state when class data is fetched
  useEffect(() => {
    if (data && data.data) {
      setFormData({
        class_name: data.data.class_name || '',
        description: data.data.description || '',
      });
    }
  }, [data]);

  // Handle input change and update local state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // Handle cancel button click
  const onClickBack = () => {
    navigate('/admin/classes');
  };
  // Handle update (submit) button click

  const onSubmit = async () => {
    try {
      dispatch(setSnackbar({ open: true }));
      await updateClassesData({ id, formData }).unwrap();
      navigate('/admin/classes');
    } catch (error) {
      console.error('Update failed', error);
    }
  };
  if (isLoading) {
    return <LoadingCircle />;
  }
  if (fetchError) return <p>Error loading class data.</p>;

  return (
    <FormComponent
      title={'Update Class'}
      subTitle={'Please fill class information'}
    >
      <CardComponent title={'Class Information'}>
        <Stack>
          <Typography variant="body1">Class's Name</Typography>
          <TextField
            name="class_name"
            value={formData.class_name}
            onChange={handleInputChange}
            placeholder="Class name"
          />
        </Stack>
        <Stack>
          <Typography variant="body1">Description</Typography>
          <TextField
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            minRows={5}
            placeholder="Description"
          />
        </Stack>
        <ButtonContainer
          leftBtn={onClickBack}
          rightBtn={onSubmit}
          leftBtnTitle={'Cancel'}
          rightBtnTitle={'Update'}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => dispatch(setSnackbar({ open: false }))}
        >
          <Alert
            onClose={() => dispatch(setSnackbar({ open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardComponent>
    </FormComponent>
  );
}

export default ClassUpdatePage;
