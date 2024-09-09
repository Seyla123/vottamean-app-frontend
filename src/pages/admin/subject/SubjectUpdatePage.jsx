import CardComponent from "../../../components/common/CardComponent";
import { Typography, Stack, TextField } from "@mui/material"
import { fieldContainer } from "../../../styles/authStyle";
import FormComponent from "../../../components/common/FormComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
function SubjectUpdatePage() {
    const onClickBack = () => {
        console.log('cancel');

    }
    const onClickNext = () => {
        console.log('update');

    }
    return (
        <>
            <FormComponent title={"Update Subject"} subTitle={"Please Fill subject information"}>
                <CardComponent title={"Subject Information"}>
                    {/* subject name input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">Subject&apos;s Name</Typography>
                        <TextField placeholder="school&apos;s name" />
                    </Stack>
                    {/* description input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">Description</Typography>
                        <TextField
                            multiline
                            minRows={5}
                            placeholder="description"
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

export default SubjectUpdatePage;