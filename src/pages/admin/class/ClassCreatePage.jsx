import React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
//import marterial ui
import {Typography,Stack,TextField,Snackbar,IconButton,Alert,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//Import component
import { useForm, Controller } from 'react-hook-form';
import { fieldContainer } from '../../../styles/authStyle';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { usePostClassesDataMutation } from '../../../services/classApi';
import { ClassValidator } from '../../../validators/validationSchemas';
// import { createClassData } from '../../../store/slices/classSlice';


function ClassCreatePage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const { control, handleSubmit,getValues,formState: { isSubmitting, errors }, } = useForm({
    resolver: yupResolver(ClassValidator),
  });
  const [addClass] = usePostClassesDataMutation();
  const onSubmit = async () => {
    try {
      const { class_name, description } = getValues();
      const formatData = {
        class_name,
        description,
      };
      // Dispatch the action to update the class data in Redux
      await addClass(formatData).unwrap();
      setSnackbarMessage(
        'You are created class successfully, please go to class list',
      );
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      // On error, set an error message and open Snackbar to show error message
      setSnackbarMessage(
        'There was an issue with your creating or you are creating duplicate class',
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            disabled={isSubmitting}
          />
          {/*  Display Snackbar for notifications */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </CardComponent>
      </FormComponent>
    </>
  );
}
export default ClassCreatePage;
