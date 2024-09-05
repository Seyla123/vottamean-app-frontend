import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const SubHeader = ({ title }) => {
    return (
        <Box display={"flex"} flexDirection={"column"} alignContent={"start"} width={"100%"}>
            <Typography fontSize={16} fontWeight={"bold"} marginBottom={2}>
                {title}
            </Typography>
            <Divider sx={{ width: "100%" }} />
        </Box>
    )
}

export default SubHeader;
