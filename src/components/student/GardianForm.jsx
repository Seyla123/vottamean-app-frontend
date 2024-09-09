import { useState } from "react"
import { Stack } from "@mui/material";
import TextFieldComponent from "../common/TextFieldComponent";
function GardianForm() {
    const [newGuardian, setNewGuardian] = useState({
        firstName: "",
        lastName: "",
        relationship: "",
        email: "",
        phoneNumber: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGuardian((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <Stack direction={"row"} gap={1}>
                {/* first name */}
                <TextFieldComponent
                    customStyle={{ flexGrow: 1 }}
                    label="First Name"
                    name="firstName"
                    value={newGuardian.firstName}
                    onChange={handleInputChange}
                    placeholder={"first name"}
                />
                {/* last name */}
                <TextFieldComponent
                    customStyle={{ flexGrow: 1 }}
                    label="Last Name"
                    name="lastName"
                    value={newGuardian.lastName}
                    onChange={handleInputChange}
                    placeholder={"last name"}
                />
            </Stack>
            {/* relationship */}
            <TextFieldComponent
                label="Relationship"
                name="relationship"
                value={newGuardian.relationship}
                onChange={handleInputChange}
                placeholder={"relationship"}
            />
            {/* email */}
            <TextFieldComponent
                label="Email"
                name="email"
                value={newGuardian.email}
                onChange={handleInputChange}
                placeholder={"email"}
            />
            {/* phone number */}
            <TextFieldComponent
                label="Phone Number"
                name="phoneNumber"
                value={newGuardian.phoneNumber}
                onChange={handleInputChange}
                placeholder={"phone number"}
            />
        </>
    )
}

export default GardianForm