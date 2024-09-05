import React from 'react'
import {
    Box,
    Typography,
    useTheme,
} from "@mui/material";

const Header = ({ header, subheader }) => {
    const theme = useTheme();
    const mobile = theme.breakpoints
    const subHeader = {
        mt: "10px",
        [mobile.down("sm")]: {
            fontSize: "14px",
        },
        [mobile.up("sm")]: {
            fontSize: "16px",
        },
    }
    return (
        <Box marginBottom={3} marginTop={4}>
            <Typography fontWeight="bold" variant="h4">
                {header}
            </Typography>
            <Typography
                color="text.secondary"
                sx={subHeader}
            >
                {subheader}
            </Typography>
        </Box>
    )
}

export default Header;

