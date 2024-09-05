import React from 'react'
import {
    Box,
    Typography,
    useTheme,
} from "@mui/material";

const Header = ({ header, subheader }) => {
    const theme = useTheme();
    const subHeader = {
        mt: "10px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: "16px",
        },
    }
    return (
        <Box sx={{ marginBottom: "24px", marginTop: "32px" }}>
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

