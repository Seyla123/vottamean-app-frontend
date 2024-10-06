import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { Library, ScrollText } from 'lucide-react';
// import components
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
// import validator, style, api and uiSlice
import { SubjectValidator } from '../../../validators/validationSchemas';
import { fieldContainer } from '../../../styles/authStyle';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useCreateSubjectMutation } from '../../../services/subjectApi';

function SubjectCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useCreateSubjectMutation : returns a function to create a subject
  const [
    createSubject,
    {
      isLoading: isCreating,
      isError: isUpdateError,
      isSuccess: isCreateSuccess,
      error: updateError,
    },
  ] = useCreateSubjectMutation();

  // yup validator
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubjectValidator),
    defaultValues: {
      subject_name: '',
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
    } else if (isCreateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Subject created successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/subjects');
    }
  }, [dispatch, isUpdateError, isCreating, isCreateSuccess]);

  const onSubmit = async () => {
    try {
      const { subject_name, description } = getValues();
      const formData = { subject_name, description };
      await createSubject(formData).unwrap();
    } catch (err) {
      console.log('error message :', err);
    }
  };

  return (
    <>
      <FormComponent
        title={'Add Subject'}
        subTitle={'Please Fill Subject information'}
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
                  placeholder="subject's name"
                  error={!!errors.subject_name}
                  helperText={
                    errors.subject_name ? errors.subject_name.message : ''
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Library size={20} />
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
                  placeholder="description"
                  helperText={ errors.description ? errors.description.message : ''}
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
            rightBtn={handleSubmit(onSubmit)}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Add Subject'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SubjectCreatePage;
