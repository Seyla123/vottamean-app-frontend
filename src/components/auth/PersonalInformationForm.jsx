import HeaderTitle from './HeaderTitle'
import { Box, TextField, Typography, } from '@mui/material'
function PersonalInformationForm() {
    return (
        <Box>
            {/* header title */}
            <HeaderTitle 
                title={"Personal information"} 
                subTitle={"Input your information"}
            />

             {/* form container */}
             <Box >
                {/* name input container */}
                <Box sx={{display: "flex", gap: 1, width: "100%", bgcolor: "green"}}>

                    {/* first name input */}
                    <Box sx={{width: "100%"}}>
                        <Typography variant="body1">First name</Typography>
                        <TextField placeholder="first name" fullWidth/>
                    </Box>
                    {/* last name input */}
                    <Box>
                        <Typography variant="body1">Last name</Typography>
                        <TextField placeholder="last name" fullWidth/>
                    </Box>
                </Box>
             </Box>

        </Box>
    )
}

export default PersonalInformationForm