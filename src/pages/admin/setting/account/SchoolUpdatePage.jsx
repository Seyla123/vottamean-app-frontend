import { Stack, Typography, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice'; // Import Redux actions
import CardComponent from '../../../../components/common/CardComponent';
import FormComponent from '../../../../components/common/FormComponent';
import ButtonContainer from '../../../../components/common/ButtonContainer';
import { fieldContainer } from '../../../../styles/authStyle';

function SchoolUpdatePage() {
  const dispatch = useDispatch();

  // Fetch the form data from Redux state
  const formData = useSelector((state) => state.form);

  // Handle input change for school fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value })); // Update form data in Redux
  };

  const onClickNext = () => {
    console.log('next');
  };

  return (
    <>
      <FormComponent
        title={'Update School'}
        subTitle={'Update school information'}
      >
        <CardComponent title={'School Information'}>
          {/* school name input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">School&apos;s Name</Typography>
            <TextField
              name="school_name"
              placeholder="school's name"
              value={formData.school_name} // Bind to Redux state
              onChange={handleInputChange} // Dispatch change to Redux
            />
          </Stack>
          {/* phone number input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Phone Number</Typography>
            <TextField
              name="school_phone_number"
              placeholder="phone number"
              value={formData.school_phone_number} // Bind to Redux state
              onChange={handleInputChange} // Dispatch change to Redux
            />
          </Stack>
          {/* address input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Address</Typography>
            <TextField
              name="school_address"
              multiline
              minRows={5}
              placeholder="Phnom Penh, Street 210, ..."
              value={formData.school_address} // Bind to Redux state
              onChange={handleInputChange} // Dispatch change to Redux
            />
          </Stack>
          {/* Button Container  */}
          <ButtonContainer
            rightBtn={onClickNext}
            leftBtnTitle={'Cancel'}
            rightBtnTitle={'Update'}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default SchoolUpdatePage;
