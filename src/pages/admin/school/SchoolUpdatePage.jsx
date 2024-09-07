import TitleHeader from "../../../components/common/TitleHeader"
import { Box, Typography, Divider, Stack, TextField, Card } from "@mui/material"
import { fieldContainer } from "../../../styles/authStyle";
function SchoolUpdatePage() {
  return (
    <>
      <TitleHeader title="Update School" subTitle={"Update School Information"} />
        <Box component={'form'} direction="column" sx={{...CardContainer, boxShadow: "0px 5px 10px rgba(0,0,0,0.08)"}}>
            <Stack component={'div'} direction="column" gap={1}>
            <Typography variant="formTitle" >School Information</Typography>
            <Divider sx={{  borderWidth: 1 , borderColor: "text.secondary"}} />
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

      </Box>
    </>
  )
}

export default SchoolUpdatePage;
const CardContainer = {
    width: "100%",
    padding: { xs: 3, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRadius: "8px",
    border: "0.3px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.05)",
  };