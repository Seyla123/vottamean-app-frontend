import CardComponent from "../../../../components/common/CardComponent";
import { Typography, Stack, Avatar, Box } from "@mui/material"
import TextFieldComponent from "../../../../components/common/TextFieldComponent";
import FormComponent from "../../../../components/common/FormComponent";
import SelectField from "../../../../components/common/SelectField";
import ButtonContainer from "../../../../components/common/ButtonContainer";
import userProfile from "../../../../assets/images/default-profile.png";
import { useState } from "react";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function SchoolUpdatePage() {
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: null,
        phoneNumber: "",
        address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };
    const onClickBack = () => {
        console.log('back');

    }
    const onClickNext = () => {
        console.log('submit');

    }
    return (
        <>
            <FormComponent title={"Update User"} subTitle={"Update user information"}>
                <CardComponent title={"User Information"}>
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
                            value={newUser.firstName}
                            onChange={handleInputChange}
                            placeholder={"first name"}
                        />
                        {/* last name */}
                        <TextFieldComponent
                            customStyle={{ flexGrow: 1 }}
                            label="Last Name"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleInputChange}
                            placeholder={"last name"}
                        />
                    </Stack>
                    {/* gender */}
                    <SelectField
                        label="Gender"
                        name="gender"
                        value={newUser.gender}
                        onChange={handleInputChange}
                        options={genderOptions}
                        placeholder={"select gender"}
                    />
                    {/* dob */}
                    <Box display="flex" flexDirection="column" gap="4px">
                        <Typography sx={{ fontSize: "16px" }}>Date of birth</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker

                                inputFormat="MM/DD/YYYY"
                                value={newUser.dob}
                                onChange={(date) =>
                                    setnewUser((prev) => ({ ...prev, dob: date }))
                                }
                                renderInput={(params) => <TextFieldComponent {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    {/* phone number */}
                    <TextFieldComponent
                        label="Phone Number"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={handleInputChange}
                        placeholder={"phone number"}
                    />
                    {/* address */}
                    <TextFieldComponent
                        label="Address"
                        name="address"
                        value={newUser.address}
                        onChange={handleInputChange}
                        placeholder={"address"}
                    />
                    {/* Button Container  */}
                    <ButtonContainer
                        leftBtn={onClickBack}
                        rightBtn={onClickNext}
                        leftBtnTitle={'Cancel'}
                        rightBtnTitle={'Update'}
                    />
                </CardComponent>
            </FormComponent>
        </>
    )
}

export default SchoolUpdatePage;


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
