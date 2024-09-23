import React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
//import marterial ui
import {
  Typography,
  Stack,
  TextField,
  Snackbar,
  IconButton,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//Import component
import { useForm, Controller } from 'react-hook-form';
import { fieldContainer } from '../../../styles/authStyle';
import CardComponent from '../../../components/common/CardComponent';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { usePostClassesDataMutation } from '../../../services/classApi';
import { ClassValidator } from '../../../validators/validationSchemas';
import { setSnackbar } from '../../../store/slices/classSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ClassCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { snackbar } = useSelector((state) => state.classes);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClassValidator),
  });
  const [addClass, isLoading, isSuccess, isError] = usePostClassesDataMutation();
  const onSubmit = async () => {
    try {
      const { class_name, description } = getValues();
      const formData = {
        class_name,
        description,
      };
      dispatch(setSnackbar({ open: true }));
      // Dispatch the action to update the class data in Redux
      await addClass(formData).unwrap();
      navigate("/admin/classes");
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
          {/*  Display Snackbar for notifications */}
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
    </>
  );
}
export default ClassCreatePage;
