import { Box, Typography } from '@mui/material'

function HeaderTitle({title , subTitle}) {
    return (
        <Box>
            <Typography variant="h4" fontWeight={"bold"} padding={0}>
                {title}
            </Typography>
            <Typography variant="subtitle1">{subTitle}</Typography>
        </Box>
    )
}

export default HeaderTitle