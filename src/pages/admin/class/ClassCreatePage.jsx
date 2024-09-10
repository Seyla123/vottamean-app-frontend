import CardComponent from "../../../components/common/CardComponent";
import { Typography, Stack, TextField } from "@mui/material"
import { fieldContainer } from "../../../styles/authStyle";
import FormComponent from "../../../components/common/FormComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";
function ClassCreatePage() {
    }
    const onClickNext = () => {
        console.log('add');

    }
    return (
        <>
            <FormComponent title={"Add Class"} subTitle={"Please fill class information"}>
                <CardComponent title={"Class Information"}>
                    {/* Class name input container */}
                    <Stack sx={fieldContainer} >
                        <Typography variant="body1">Class&apos;s Name</Typography>
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
                        rightBtn={onClickNext} 
                        leftBtnTitle={'Cancel'} 
                        rightBtnTitle={'Add Class'} 
                    />
                </CardComponent>
            </FormComponent>
        </>
    )
}

export default ClassCreatePage;