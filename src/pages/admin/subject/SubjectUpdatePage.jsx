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
  useGetSubjectsQuery,
  useUpdateSubjectMutation,
} from '../../../services/subjectApi';
function SubjectUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data, isLoading, fetchError } = useGetSubjectsQuery(id);

  const [formData, setFormData] = useState({
    name: '',
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
        name: data.data.name || '',
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

  const onClickNext = () => {
    console.log('update');
  };
  const onClickBack = () => {
    console.log('ok');
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
              name="name"
              value={formData.name}
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
            rightBtn={onClickNext}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SubjectUpdatePage;
