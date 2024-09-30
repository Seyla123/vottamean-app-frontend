import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Stack, TextField } from '@mui/material';
// import components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import style, api and uiSlice
import { fieldContainer } from '../../../styles/authStyle';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useGetSubjectByIdQuery, useUpdateSubjectMutation } from '../../../services/subjectApi';

function SubjectUpdatePage() {
  // useState: "data to be displayed as state and for deleted"
  const [formData, setFormData] = useState({
    subject_name: '',
    description: ''
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  // useGetSubjectByIdQuery : return a function a subject within ID
  const { data, fetchError, isLoading, isSuccess } = useGetSubjectByIdQuery(id);

  // useUpdateSubjectMutation : returns a function to update a subject
  const [ updateSubject,
    { isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdatedSuccess,
      error: updateError }
  ] = useUpdateSubjectMutation();

  useEffect(() => {
    // set the update details state when subject records are fetched successfully
    if (data && isSuccess) {
      setFormData({
        subject_name: data.data.subject_name || '',
        description: data.data.description || '',
      });
    }

    // Show a snackbar with messages during updating (progress, failure, success)
    if (isUpdating) {
      dispatch( setSnackbar({
        open: true,
        message: 'Updating...',
        severity: 'info'
      }));
    } else if (isUpdateError) {
      dispatch( setSnackbar({
          open: true,
          message: updateError.data.message,
          severity: 'error',
        }));
    } else if (isUpdatedSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }));
      navigate('/admin/subjects');
    }
  }, [data, dispatch, isUpdateError, isUpdatedSuccess, isUpdating]);
  
  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (fetchError) return <p>Error loading subjects: {fetchError.message} </p>;

  // Handle input being changing
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

  return (
    <>
      <FormComponent
        title={'Update Subject'}
        subTitle={'Please Fill subject information'}
      >
        <CardComponent title={'Subject Information'}>
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Subject's Name</Typography>
            <TextField
              placeholder="school's name"
              name="subject_name"
              value={formData.subject_name}
              onChange={handleInputChange}
            />
          </Stack>
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
