import TitleHeader from "../../../components/common/TitleHeader"
import { Box, Typography, Button, Stack, TextField } from "@mui/material"
import { fieldContainer } from "../../../styles/authStyle";
import { cardContainer } from "../../../styles/global";
import CardHeader from "../../../components/common/CardHeader";
function SchoolUpdatePage() {
    return (
        <>
            
            <TitleHeader title="Update School" subTitle={"Update School Information"} />
            <Box component={'form'} direction="column" sx={{ ...cardContainer }}>
                {/* Card Title */}
                <CardHeader title="School Information" />
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
                <Stack direction={'row'} alignSelf={'flex-end'} width={{xs:'100%',sm:'340px'}} gap={{xs:1,sm:2}}>
                    <Button fullWidth variant="outlined"color="white">
                        Cancel
                    </Button>
                    <Button fullWidth variant="contained" >
                        ADD SESSION
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default SchoolUpdatePage;