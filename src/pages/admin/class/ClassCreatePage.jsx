// refactered one
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, TextField } from '@mui/material';
// Import component
import { useForm, Controller } from 'react-hook-form';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
// Import validator, style, api and uiSlice
import { ClassValidator } from '../../../validators/validationSchemas';
import { fieldContainer } from '../../../styles/authStyle';
import { usePostClassesDataMutation } from '../../../services/classApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

function ClassCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // usePostClassesDataMutation : returns a function to create a class
  const [
    addClass,
    {
      isLoading: isCreating,
      isError: isUpdateError,
      isSuccess: isCreateSuccess,
      error: updateError,
    },
  ] = usePostClassesDataMutation();

  // yup validator
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassValidator),
    defaultValues: {
      class_name: '',
      description: '',
    },
  });

  // Show a snackbar with messages during creating (progress, failure, success)
  useEffect(() => {
    if (isCreating) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating...',
          severity: 'info'
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
    } else if (isCreateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Created successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/classes');
    }
  }, [dispatch, isUpdateError, isCreating, isCreateSuccess]);

  //handle Submit
  const onSubmit = async () => {
    try {
      const { class_name, description } = getValues();
      const formData = { class_name, description };
      await addClass(formData).unwrap();
    } catch (err) {
      console.log('error message :', err);
    }
  };

  return (
    <>
      <FormComponent
        title={'Add Class'}
        subTitle={'Please fill class information'}
      >
        <CardComponent title={'Class Information'}>
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Class's Name</Typography>
            <Controller
              name="class_name"
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder="class's name"
                  {...field}
                  error={!!errors.class_name}
                  helperText={
                    errors.class_name ? errors.class_name.message : ''
                  }
                />
              )}
            />
          </Stack>
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Description</Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                {...field}
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : ''
                  }
                  multiline
                  minRows={5}
                  placeholder="description"
                />
              )}
            />
          </Stack>
          <ButtonContainer
            rightBtn={handleSubmit(onSubmit)}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Add Class'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default ClassCreatePage;
