import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const AccountSettingInfoCard = ({ title, description, imageUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {!isMobile && (
        <Box
          component="img"
          src={imageUrl}
          alt="Profile"
          sx={{ width: '250px', height: 'auto' }}
        />
      )}
    </Box>
  );
};

export default AccountSettingInfoCard;
