import { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import TextFieldComponent from '../common/TextFieldComponent';
function GardianForm() {
  const [newGuardian, setNewGuardian] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    email: '',
    phoneNumber: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuardian((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Stack direction={'row'} gap={1}>
        {/* first name */}
        <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
          <Typography variant="body2" fontWeight="bold">
            First Name
            <span style={{ color: 'red', marginLeft: 1 }}>*</span>
          </Typography>
          <TextFieldComponent
            customStyle={{ flexGrow: 1 }}
            name="firstName"
            value={newGuardian.lastName}
            onChange={handleInputChange}
            placeholder={'first name'}
          />
        </Box>
        {/* last name */}
        <Box display="flex" flexDirection="column" gap="4px" width={'100%'}>
          <Typography variant="body2" fontWeight="bold">
            Last Name
            <span style={{ color: 'red', marginLeft: 1 }}>*</span>
          </Typography>
          <TextFieldComponent
            customStyle={{ flexGrow: 1 }}
            name="lastName"
            value={newGuardian.lastName}
            onChange={handleInputChange}
            placeholder={'last name'}
          />
        </Box>
      </Stack>
      {/* relationship */}
      <Box>
        <Typography variant="body2" fontWeight="bold">
          Relationship
          <span style={{ color: 'red', marginLeft: 1 }}>*</span>
        </Typography>
        <TextFieldComponent
          name="relationship"
          value={newGuardian.relationship}
          onChange={handleInputChange}
          placeholder={'relationship'}
        />
      </Box>
      {/* email */}
      <Box>
      <Typography variant="body2" fontWeight="bold">
          Email
          <span style={{ color: 'red', marginLeft: 1 }}>*</span>
        </Typography>
      <TextFieldComponent
        name="email"
        value={newGuardian.email}
        onChange={handleInputChange}
        placeholder={'email'}
      />
      </Box>
      {/* phone number */}
      <Box>
      <Typography variant="body2" fontWeight="bold">
          Phone Number
          <span style={{ color: 'red', marginLeft: 1 }}>*</span>
        </Typography>
      <TextFieldComponent
        name="phoneNumber"
        value={newGuardian.phoneNumber}
        onChange={handleInputChange}
        placeholder={'phone number'}
      />
      </Box>
    </>
  );
}

export default GardianForm;
