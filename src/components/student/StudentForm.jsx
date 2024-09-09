import { useState } from "react"
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextFieldComponent from "../common/TextFieldComponent";
import SelectField from "../common/SelectField";
import { Box, Typography, Stack, Avatar } from "@mui/material";
import userProfile from "../../assets/images/default-profile.png";
function StudentFrom() {
    const [newStudent, setNewStudent] = useState({
        firstName: "",
        lastName: "",
        className: "",
        gender: "",
        dob: null,
        phoneNumber: "",
        email: "",
        address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            {/* container img */}
            <Stack component={'div'} alignSelf={"center"} >
                <Avatar sx={imgStyle} alt="user profile" src={userProfile} />
            </Stack>
            <Stack direction={"row"} gap={1}>
                {/* first name */}
                <TextFieldComponent
                    customStyle={{ flexGrow: 1 }}
                    label="First Name"
                    name="firstName"
                    value={newStudent.firstName}
                    onChange={handleInputChange}
                    placeholder={"first name"}
                />
                {/* last name */}
                <TextFieldComponent
                    customStyle={{ flexGrow: 1 }}
                    label="Last Name"
                    name="lastName"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    placeholder={"last name"}
                />
            </Stack>
            {/* class */}
            <SelectField
                label="Class"
                name="className"
                value={newStudent.className}
                onChange={handleInputChange}
                options={classOptions}
                placeholder={"select class"}
            />
            <Stack direction={"row"} gap={1}>
            {/* gender */}
            <SelectField
                customStyle={{ flexGrow: 1 }}
                label="Gender"
                name="gender"
                value={newStudent.gender}
                onChange={handleInputChange}
                options={genderOptions}
                placeholder={"select gender"}
            />
            {/* dob */}
            <Box display="flex" flexDirection="column" gap="4px" flexGrow={1}>
                <Typography sx={{ fontSize: "16px" }}>Date of birth</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker

                        inputFormat="MM/DD/YYYY"
                        value={newStudent.dob}
                        onChange={(date) =>
                            setNewStudent((prev) => ({ ...prev, dob: date }))
                        }
                        renderInput={(params) => <TextFieldComponent {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            </Stack>
            {/* phone number */}
            <TextFieldComponent
                label="Phone Number"
                name="phoneNumber"
                value={newStudent.phoneNumber}
                onChange={handleInputChange}
                placeholder={"phone number"}
            />
            {/* email */}
            <TextFieldComponent
                label="Email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                placeholder={"email"}
            />
            {/* address */}
            <TextFieldComponent
                label="Address"
                name="address"
                value={newStudent.address}
                onChange={handleInputChange}
                placeholder={"address"}
            />
        </>
    )
}

export default StudentFrom;

const imgStyle = {
    width: {
        xs: 120, sm: 160
    }, height: {
        xs: 120, sm: 160
    }, display: "flex"
}

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "Prefer not to say", label: "Prefer not to say" }
];
const classOptions = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
];
