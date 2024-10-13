// refactoered with validation
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { BookText, ScrollText } from 'lucide-react';
// import components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import style, api and uiSlice
import { ClassValidator } from '../../../validators/validationSchemas';
import { fieldContainer } from '../../../styles/authStyle';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useGetClassesByIdQuery, useUpdateClassesDataMutation } from '../../../services/classApi';

function ClassUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch class details
  const { data, fetchError, isLoading, isSuccess } = useGetClassesByIdQuery(id);
  
  // Mutation for updating class
  const [updateClassesData, {
    isLoading: isUpdating,
    isError: isUpdateError,
    isSuccess: isUpdatedSuccess,
    error: updateError
  }] = useUpdateClassesDataMutation();

  // Setup form with react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ClassValidator),
    defaultValues: {
      class_name: '',
      description: '',
    },
  });

  // Fetch and set form data when the class is successfully fetched
  useEffect(() => {
    if (data && isSuccess) {
      setValue('class_name', data.data.class_name || '');
      setValue('description', data.data.description || '');
    }
  }, [data, isSuccess, setValue]);

  // Handle update mutation lifecycle (loading, success, error)
  useEffect(() => {
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
        severity: 'error'
      }));
    } else if (isUpdatedSuccess) {
      dispatch( setSnackbar({
        open: true,
        message: 'Updated successfully',
        severity: 'success'
      }));
      navigate('/admin/classes');
    }
  }, [isUpdating, isUpdateError, isUpdatedSuccess, updateError, dispatch, navigate]);

  // Submit handler
  const onSubmit = async () => {
      const { class_name, description } = getValues();
      const formData = { class_name, description };
      await updateClassesData({ id, formData }).unwrap();

  };

  // Back button handler
  const onClickBack = () => {
    navigate('/admin/classes');
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (fetchError) return <p>Error loading class: {fetchError.message}</p>;

  return (
    <>
      <FormComponent title={'Update Class'} subTitle={'Please Fill class information'}>
        <CardComponent title={'Class Information'}>
          <Stack sx={fieldContainer}>
            <Typography variant="body2" fontWeight="bold">
              Class's Name
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="class_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.class_name}
                  helperText={errors.class_name ? errors.class_name.message : ''}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <BookText size={20} />
                        </InputAdornment>
                      ),
                    },
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
                  helperText={errors.description ? errors.description.message : ''}
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

export default ClassUpdatePage;
