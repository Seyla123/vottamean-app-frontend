import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Library, ScrollText } from 'lucide-react';
// import components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import style, api and uiSlice
import { SubjectValidator } from '../../../validators/validationSchemas';
import { fieldContainer } from '../../../styles/authStyle';
import { setSnackbar } from '../../../store/slices/uiSlice';
import {
  useGetSubjectByIdQuery,
  useUpdateSubjectMutation,
} from '../../../services/subjectApi';

function SubjectUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch subject details
  const { data, fetchError, isLoading, isSuccess } = useGetSubjectByIdQuery(id);

  // Mutation for updating subject
  const [
    updateSubject,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdatedSuccess,
      error: updateError,
    },
  ] = useUpdateSubjectMutation();

  // Setup form with react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubjectValidator),
    defaultValues: {
      subject_name: '',
      description: '',
    },
  });

  // Fetch and set form data when the subject is successfully fetched
  useEffect(() => {
    if (data && isSuccess) {
      setValue('subject_name', data.data.subject_name || '');
      setValue('description', data.data.description || '');
    }
  }, [data, isSuccess, setValue]);

  // Handle update mutation lifecycle (loading, success, error)
  useEffect(() => {
    if (isUpdating) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updating...',
          severity: 'info',
        }),
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
  }, [
    isUpdating,
    isUpdateError,
    isUpdatedSuccess,
    updateError,
    dispatch,
    navigate,
  ]);

  // Submit handler
  const onSubmit = async () => {
    const { subject_name, description } = getValues();
    const formData = { subject_name, description };
    await updateSubject({ id, formData }).unwrap();
  };

  // Back button handler
  const onClickBack = () => {
    navigate('/admin/subjects');
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (fetchError) return <p>Error loading subject: {fetchError.message}</p>;

  return (
    <>
      <FormComponent
        title={'Update Subject'}
        subTitle={'Please Fill subject information'}
      >
        <CardComponent title={'Subject Information'}>
          <Stack sx={fieldContainer}>
            <Typography variant="body2" fontWeight="bold">
              Subject's Name
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="subject_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.subject_name}
                  helperText={
                    errors.subject_name ? errors.subject_name.message : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Library size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <Stack sx={fieldContainer}>
            <Typography variant="body2" fontWeight="bold">
              Description
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.description}
                  multiline
                  minRows={5}
                  helperText={
                    errors.description ? errors.description.message : ''
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <ScrollText size={20} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '.MuiInputBase-root': {
                      alignItems: 'flex-start',
                    },
                  }}
                />
              )}
            />
          </Stack>
          <ButtonContainer
            leftBtn={onClickBack}
            rightBtn={handleSubmit(onSubmit)}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SubjectUpdatePage;
