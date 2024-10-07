import React from 'react';
import { Box, Typography, Avatar, Chip, Grid } from '@mui/material';
import RandomAvatar from './RandomAvatar';

const ProfileSection = ({ profilePhoto, adminProfileData }) => {
  const { userName, userEmail, userGender, userId } = adminProfileData;

  return (
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
        }}
      >
        {profilePhoto ? (
          <Avatar
            src={profilePhoto}
            alt={userName}
            sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
          />
        ) : (
          <RandomAvatar username={userName} gender={userGender} size={120} />
        )}

        <Typography variant="h5" gutterBottom mt={2}>
          {userName}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {userEmail}
        </Typography>
        <Chip
          label={`ID: ${userId}`}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
    </Grid>
  );
};

export default ProfileSection;
