import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Chip,
  List,
  ListItem,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import {
  PencilLine as EditIcon,
  Phone as PhoneIcon,
  MapPin as Location,
  User2 as PersonIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
} from 'lucide-react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ProfileSection from './ProfileSection';
import { truncate } from '../../utils/truncate';

const InfoItem = ({ icon, label, value }) => (
  <Grid item xs={12}>
    <List
      sx={{
        p: 0,
        width: '100%',
        maxWidth: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <ListItem>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
              }}
            >
              <Box sx={{ color: 'primary.main' }}>{icon}</Box>
              <Typography variant="body1">{label}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {value ? truncate(value, 30) : ''}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  </Grid>
);

const InformationSection = ({
  title,
  data,
  onEdit,
  infoType,
  disableEdit = true,
  profilePhoto,
}) => {
  const getInfoItems = () => {
    if (infoType === 'personal') {
      return [
        {
          icon: <CakeIcon size={18} />,
          label: 'Date of Birth',
          value: data.userDOB,
        },
        {
          icon: <PhoneIcon size={18} />,
          label: 'Contact',
          value: data.userPhoneNumber,
        },
        {
          icon: <Location size={18} />,
          label: 'Address',
          value: data.userAddress,
        },
        {
          icon:
            data.userGender === 'Male' ? (
              <MaleIcon fontSize="small" />
            ) : (
              <FemaleIcon fontSize="small" />
            ),
          label: 'Gender',
          value: data.userGender,
        },
      ];
    } else if (infoType === 'school') {
      return [
        {
          icon: <SchoolIcon size={18} />,
          label: 'School Name',
          value: data.schoolName,
        },
        {
          icon: <PhoneIcon size={18} />,
          label: 'School Contact',
          value: data.schoolPhoneNumber,
        },
        {
          icon: <Location size={18} />,
          label: 'School Address',
          value: data.schoolAddress,
        },
      ];
    }
    return [];
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mt: 6,
          }}
        >
          <Typography variant="h6" sx={{ height: '100%' }}>
            {title}
          </Typography>
          {disableEdit && (
            <StyledButton
              variant="outlined"
              size="small"
              startIcon={<EditIcon size={18} />}
              onClick={onEdit}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Edit
            </StyledButton>
          )}
        </Box>
      </Box>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12}>
          {infoType === 'personal' && (
            <ProfileSection profilePhoto={profilePhoto} userData={data} />
          )}
        </Grid>
        {getInfoItems().map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </Grid>
    </Box>
  );
};

export default InformationSection;
