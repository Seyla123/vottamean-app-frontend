import CardComponent from "../../../../components/common/CardComponent";
import { Typography, Stack, Avatar, TextField } from "@mui/material"
import { fieldContainer } from "../../../../styles/authStyle";
import FormComponent from "../../../../components/common/FormComponent";
import ButtonContainer from "../../../../components/common/ButtonContainer";
import userProfile from "../../../../assets/images/default-profile.png";
function SchoolUpdatePage() {
    const onClickBack = () => {
        console.log('back');

    }
    const onClickNext = () => {
        console.log('next');

    }
    return (
        <>
            <FormComponent title={"Update User"} subTitle={"Update user information"}>
                <CardComponent title={"User Information"}>
                    {/* container img */}
                    <Stack component={'div'} alignSelf={"center"} >
                       <Avatar sx={imgStyle} alt="user profile" src={userProfile} />
                    </Stack>
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


const containerStyle = {
    display: "flex",
    width: "100%",
    mt: {
        xs: 2, sm: 4
    },
    justinfyContent: "center",
    alignContent : 'center'
}
const imgStyle = {
    width: {
        xs: 120, sm: 160
    }, height: {
        xs: 120, sm: 160
    }, display: "flex"
}