import CardComponent from "../../../../components/common/CardComponent";
import { Typography, Box, Stack, TextField } from "@mui/material"
import { fieldContainer } from "../../../../styles/authStyle";
import FormComponent from "../../../../components/common/FormComponent";
import ButtonContainer from "../../../../components/common/ButtonContainer";
function SchoolUpdatePage() {
    const onClickBack = () => {
        console.log('back');

    }
    const onClickNext = () => {
        console.log('next');

    }
    return (
        <>
            <FormComponent title={"Update School"} subTitle={"Update school information"}>
                <CardComponent title={"School Information"}>
                    {/* container img */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="school logo" width="100px" height="100px" />
                    </Box>
                    {/* school name input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">School&apos;s Name</Typography>
                        <TextField placeholder="school&apos;s name" />
                    </Stack>
                    {/* phone number input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">Phone Number</Typography>
                        <TextField placeholder="phone number" />
                    </Stack>
                    {/* address input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">Address</Typography>
                        <TextField
                            multiline
                            minRows={5}
                            placeholder="Phnom Penh, Street 210, ..."
                        />
                    </Stack>
                    {/* Button Container  */}
                    <ButtonContainer
                        leftBtn={onClickBack}
                        rightBtn={onClickNext}
                        leftBtnTitle={'Cancel'}
                        rightBtnTitle={'Update'}
                    />
                </CardComponent>
            </FormComponent>
        </>
    )
}

export default SchoolUpdatePage;