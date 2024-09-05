import { Box, Typography, TextField } from '@mui/material';
import React from 'react';

const TextFieldBox = ({ text, id, placeholder, error, helperText }) => {
    return (
        <Box sx={textFieldGap}>
            <Typography>{text}</Typography>
            <TextField
                id={id}
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                error={error}
                helperText={helperText}
            />
        </Box>
    );
}

export default TextFieldBox;

const textFieldGap = {
    display: "flex",
    gap: 0.5,
    flexDirection: "column",
};



