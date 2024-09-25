import { useState } from 'react';
import CardComponent from '../../../components/common/CardComponent';
import { Typography, Stack, TextField } from '@mui/material';
import { fieldContainer } from '../../../styles/authStyle';
import FormComponent from '../../../components/common/FormComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { useNavigate } from 'react-router-dom';
import { useCreateSubjectMutation } from '../../../services/subjectApi';

function SubjectCreatePage() {
  const [subjectName, setSubjectName] = useState(null);
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();

  const [createSubject, { error: apiError }] = useCreateSubjectMutation();

  const onSubmit = async (data) => {
    // Additional validation for time picker fields
    if (!subjectName || !description) {
      return; // Handle required time validation
    }

    try {
      await createSubject({
        name,
        description,
        ...data,
      }).unwrap();

      navigate(`/admin/subjects`);
    } catch (error) {
      console.log('Failed to create subject:', error);
    }
  };

  return (
    <>
      <FormComponent
        title={'Add Subject'}
        subTitle={'Please Fill subject information'}
      >
        <CardComponent title={'Subject Information'}>
          {/* subject name input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Subject&apos;s Name</Typography>
            <TextField
              value={subjectName}
              placeholder="subject's name"
              onChange={(newValue) => {
                setSubjectName(newValue);
              }}
            />
          </Stack>
          {/* description input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Description</Typography>
            <TextField
              placeholder="description"
              value={description}
              multiline
              minRows={5}
            //   placeholder="description"
              onChange={(newValue) => {
                setDescription(newValue);
              }}
            />
          </Stack>
          {/* Button Container  */}
          <ButtonContainer
            rightBtn={onSubmit}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Add subject'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SubjectCreatePage;
