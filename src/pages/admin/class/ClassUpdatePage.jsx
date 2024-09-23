import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CardComponent from '../../../components/common/CardComponent';
import { Typography, Stack, TextField } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  useGetClassesByIdQuery,
  useUpdateClassesDataMutation,
} from '../../../services/classApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

function ClassUpdatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // Get the id from the url parameter
  const { id } = useParams();
  
  // useGetClassesByIdQuery : 
  const { data, isLoading, fetchError } = useGetClassesByIdQuery(id);

  // formdata : 
  const [formData, setFormData] = useState({
    class_name: '',
    description: '',
  });

  //useUpdateClassesDataMutation : 
  const [updateClassesData, { isLoading:isUpdating, isError:isUpdateError,isSuccess:isUpdatedSuccess,error:updateError }] =
    useUpdateClassesDataMutation();

  // Update local state when class data is fetched
  useEffect(() => {
    if (data && data.data) {
      setFormData({
        class_name: data.data.class_name || '',
        description: data.data.description || '',
      });
    }
  }, [data]);

  // When the update is in progress, show a snackbar with a message "Updating..."
  // When the update is failed, show a snackbar with an error message
  // When the update is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(()=>{
    if(isUpdating){
      dispatch(setSnackbar({ open:true , message: 'Updating...' ,severity : 'info'}));
    }else if(isUpdateError){
      dispatch(setSnackbar({ open:true , message: updateError.data.message , severity : 'error'}));
    }else if(isUpdatedSuccess){
      dispatch(setSnackbar({ open:true , message: 'Updated successfully', severity :'success'}));
      navigate('/admin/classes');
    }
  },[dispatch, isUpdateError, isUpdatedSuccess, isUpdating])

  // Handle input change and update local state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // Handle cancel button click
  const onClickBack = () => {
    navigate('/admin/classes');
  };

  // Handle update submit
  const onSubmit = async () => {
    try {
      await updateClassesData({ id, formData }).unwrap();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  }
  if (fetchError) return <p>Error loading class data.</p>;

  return (
    <FormComponent
      title={'Update Class'}
      subTitle={'Please fill class information'}
    >
      <CardComponent title={'Class Information'}>
        <Stack>
          <Typography variant="body1">Class's Name</Typography>
          <TextField
            name="class_name"
            value={formData.class_name}
            onChange={handleInputChange}
            placeholder="Class name"
          />
        </Stack>
        <Stack>
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
  );
}

export default ClassUpdatePage;
