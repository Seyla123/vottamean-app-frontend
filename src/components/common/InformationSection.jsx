import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import StyledButton from './StyledMuiButton';
import {
  PencilLine as EditIcon,
  Mail as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  User2 as PersonIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  IdCard as IdCardIcon,
} from 'lucide-react';

const InfoItem = ({ icon, label, value }) => (
  <Grid item xs={12} sm={6}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 1,
          borderRadius: 2,
          borderColor: 'divider',
          color: 'primary.main',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  </Grid>
);

const InformationSection = ({ title, data, onEdit, infoType }) => {
  const getInfoItems = () => {
    if (infoType === 'personal') {
      return [
        {
          icon: <PhoneIcon size={20} />,
          label: 'Contact',
          value: data.userPhoneNumber,
        },
        {
          icon: <HomeIcon size={20} />,
          label: 'Address',
          value: data.userAddress,
        },
        {
          icon: <PersonIcon size={20} />,
          label: 'Gender',
          value: data.userGender,
        },
        {
          icon: <CakeIcon size={20} />,
          label: 'Date of Birth',
          value: data.userDOB,
        },
      ];
    } else if (infoType === 'school') {
      return [
        {
          icon: <SchoolIcon size={20} />,
          label: 'School Name',
          value: data.schoolName,
        },
        {
          icon: <HomeIcon size={20} />,
          label: 'School Address',
          value: data.schoolAddress,
        },
        {
          icon: <PhoneIcon size={20} />,
          label: 'School Contact',
          value: data.schoolPhoneNumber,
        },
        {
          icon: <IdCardIcon size={20} />,
          label: 'School ID',
          value: data.schoolId,
        },
      ];
    }
    return [];
  };

  return (
    <Grid item xs={12} md={infoType === 'personal' ? 8 : 12}>
      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <StyledButton
            variant="outlined"
            startIcon={<EditIcon size={20} />}
            onClick={onEdit}
          >
            Edit
          </StyledButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          {getInfoItems().map((item, index) => (
            <InfoItem key={index} {...item} />
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default InformationSection;
