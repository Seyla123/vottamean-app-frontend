import { useState } from 'react';
import HeaderTitle from './HeaderTitle'
import { Box, TextField, Typography, Select, MenuItem, Button } from '@mui/material'
import GoBackButton from '../common/GoBackButton';

function PersonalInformationForm({ onClickBack }) {
    const [gender, setGender] = useState('');

    const handleChange = (e) => {
        setGender(e.target.value);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}>
            {/* header title */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 3 } }}>
                <GoBackButton handleOnClick={onClickBack} />
                <HeaderTitle
                    title={"Personal information"}
                    subTitle={"Input your information"}
                />
            </Box>

            {/* form container */}
            <Box
                sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}
            >
                {/* name input container */}
                <Box sx={{ display: "flex", gap: 1.5 }}>

                    {/* first name input */}
                    <Box display={"flex"} flexDirection={"column"} gap={0.5} flexGrow={1} >
                        <Typography variant="body1">First name</Typography>
                        <TextField placeholder="first name" fullWidth />
                    </Box>
                    {/* last name input */}
                    <Box display={"flex"} flexDirection={"column"} gap={0.5} flexGrow={1}>
                        <Typography variant="body1">Last name</Typography>
                        <TextField placeholder="last name" fullWidth />
                    </Box>
                </Box>

                {/* Gender selector */}
                <Box display={"flex"} flexDirection={"column"} gap={0.5}>
                    <Typography>Gender</Typography>
                    <Select fullWidth
                        value={gender}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>gender</Box>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </Box>
                {/* Date picker */}
                <Box display={"flex"} flexDirection={"column"} gap={0.5}>
                    <Typography>Date</Typography>
                    <Select fullWidth
                        value={gender}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>gender</Box>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </Box>
                <Button sx={{ padding: { xs: 1.8, md: 2 } }} variant="contained">
                    NEXT
                </Button>
            </Box>

        </Box>
    )
}

export default PersonalInformationForm