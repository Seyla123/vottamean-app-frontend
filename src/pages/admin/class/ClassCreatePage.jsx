import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
//import marterial ui
import {
  Typography,
  Stack,
  TextField,
} from '@mui/material';
//Import component
import { useForm, Controller } from 'react-hook-form';
import { fieldContainer } from '../../../styles/authStyle';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { usePostClassesDataMutation } from '../../../services/classApi';
import { ClassValidator } from '../../../validators/validationSchemas';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ClassCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassValidator),
  });

  // usePostClassesDataMutation : 
  const [addClass, {isLoading:isCreating, isError:isUpdateError, isSuccess:isCreateSuccess, error:updateError}] = usePostClassesDataMutation();

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(()=>{
    if(isCreating){
      dispatch(setSnackbar({ open:true , message: 'Deleting...' ,severity : 'info'}));
    }else if(isUpdateError){
      dispatch(setSnackbar({ open:true , message: updateError.data.message , severity : 'error'}));
    }else if(isCreateSuccess){
      dispatch(setSnackbar({ open:true , message: 'Deleted successfully', severity :'success'}));
      navigate('/admin/classes');
    }
  },[dispatch, isUpdateError, isCreating, isCreateSuccess])

  //handle Submit
  const onSubmit = async () => {
    try {
      const { class_name, description } = getValues();
      const formData = { class_name, description};
      // Dispatch the action to update the class data in Redux
      await addClass(formData).unwrap();
    } catch (err) {
      // On error, set an error message and open Snackbar to show error message
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
          {/* Class name input container */}
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
          {/* Description input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Description</Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  minRows={5}
                  placeholder="description"
                  {...field}
                />
              )}
            />
          </Stack>
          {/* Button Container */}
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
