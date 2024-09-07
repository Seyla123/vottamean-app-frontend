import {Stack , Typography, Divider} from "@mui/material"

function CardHeader({title}) {
  return (
    <Stack component={'div'} direction="column" gap={1}>
    <Typography variant="formTitle" >School Information</Typography>
    <Divider sx={{  borderWidth: 1 , borderColor: "text.secondary"}} />
    </Stack>
  )
}

export default CardHeader;