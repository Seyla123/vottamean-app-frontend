import React, { useEffect, useState } from 'react';
import CardComponent from '../../../components/common/CardComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Stack, TextField } from '@mui/material';
import { fieldContainer } from '../../../styles/authStyle';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import {
  useGetSubjectByIdQuery,
  useUpdateSubjectMutation,
} from '../../../services/subjectApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

function SubjectUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  

  const { data, isLoading, fetchError } = useGetSubjectByIdQuery(id);
  const [formData, setFormData] = useState({
    subject_name: '',
    description: '',
  });

  const [
    updateSubject,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdatedSuccess,
      error: updateError,
    },
  ] = useUpdateSubjectMutation();

  useEffect(() => {
    if (data && data.data) {
      setFormData({
        subject_name: data.data.subject_name || '',
        description: data.data.description || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (isUpdating) {
      dispatch(
        setSnackbar({ open: true, message: 'Updating...', severity: 'info' }),
      );
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: updateError.data.message,
          severity: 'error',
        }),
      );
    } else if (isUpdatedSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/subjects');
    }
  }, [dispatch, isUpdateError, isUpdatedSuccess, isUpdating]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      await updateSubject({ id, formData }).unwrap();
    } catch (error) {
      console.error('Update failed', error);
    }
  };
  const onClickBack = () => {
    navigate('/admin/subjects');
  };

  if (isLoading) {
    return <CircularIndeterminate />;
  }
  if (fetchError) return <p>Error loading class data.</p>;
  return (
    <>
      <FormComponent
        title={'Update Subject'}
        subTitle={'Please Fill subject information'}
      >
        <CardComponent title={'Subject Information'}>
          {/* subject name input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Subject's Name</Typography>
            <TextField
              placeholder="school's name"
              name="subject_name"
              value={formData.subject_name}
              onChange={handleInputChange}
            />
          </Stack>
          {/* description input container */}
          <Stack sx={fieldContainer}>
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
          {/* Button Container  */}
          <ButtonContainer
            leftBtn={onClickBack}
            rightBtn={onSubmit}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SubjectUpdatePage;
