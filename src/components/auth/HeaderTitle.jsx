import { Box, Typography } from '@mui/material'

function HeaderTitle({title , subTitle, center, children}) {
    const container = { display: "flex", flexDirection: "column", gap: 1, textAlign: center ? "center" : "left" }
    return (
        <Box sx={container}>
            {children}
            <Typography variant="h4" fontWeight={"bold"} padding={0}>
                {title}
            </Typography>
            <Typography variant="subtitle1">{subTitle}</Typography>
        </Box>
    )
}

export default HeaderTitle