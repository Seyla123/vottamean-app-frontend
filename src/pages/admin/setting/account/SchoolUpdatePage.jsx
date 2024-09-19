import CardComponent from '../../../../components/common/CardComponent';
import { Typography, Box, Stack, TextField } from '@mui/material';
import { fieldContainer } from '../../../../styles/authStyle';
import FormComponent from '../../../../components/common/FormComponent';
import ButtonContainer from '../../../../components/common/ButtonContainer';
function SchoolUpdatePage() {
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
            <TextField placeholder="school's name" />
          </Stack>
          {/* phone number input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Phone Number</Typography>
            <TextField placeholder="phone number" />
          </Stack>
          {/* address input container */}
          <Stack sx={fieldContainer}>
            <Typography variant="body1">Address</Typography>
            <TextField
              multiline
              minRows={5}
              placeholder="Phnom Penh, Street 210, ..."
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
