import { useState } from 'react';
import HeaderTitle from './HeaderTitle'
import { Box, TextField, Typography, Select, MenuItem, Button } from '@mui/material'
import GoBackButton from '../common/GoBackButton';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function PersonalInformationForm({ onClickBack, children }) {
    const [gender, setGender] = useState('');
    const [value, setValue] = useState(null);

    const handleChange = (e) => {
        setGender(e.target.value);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}>
            {/* header title */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4 } }}>
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
                <Box display={"flex"} flexDirection={"column"} gap={0.5} flexGrow={1} sx={{ width: '100%' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
                    <DatePicker
                        fullWidth
                        placeholder="Date of Birth"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        sx={{ width: '100%' }} // Ensure the DatePicker also has full width
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
                {children}
            </Box>

        </Box>
    )
}

export default PersonalInformationForm