import React from 'react';
import { Box, Typography, Avatar, Chip, Grid } from '@mui/material';
import RandomAvatar from './RandomAvatar';
import { CircleUser, BadgeCheck, Mail } from 'lucide-react';
import verifyBadge from '../../assets/icon/verify_badge.svg';

const ProfileSection = ({ profilePhoto, userData }) => {
  const { userName, userEmail, userGender, userId, userRole } = userData;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Profile image */}
        {profilePhoto ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              position: 'relative',
              boxShadow: 'rgba(17, 12, 46, 0.15) 0px 28px 100px 0px',
              p: 0.5,
              borderRadius: 50,
            }}
          >
            <Avatar
              src={profilePhoto}
              alt={userName}
              sx={{ width: 140, height: 140 }}
            />
          </Box>
        ) : (
          <RandomAvatar username={userName} gender={userGender} size={140} />
        )}

        {/* Profile details */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: '0 auto',
            alignItems: { xs: 'center', sm: 'start' },
            textAlign: { xs: 'center', sm: 'start' },
          }}
        >
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {userName}
            {userRole === 'admin' && (
              <img
                src={verifyBadge}
                alt="verified badge"
                style={{ width: '18px', height: '18px', objectFit: 'contain' }}
              />
            )}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}
          >
            <Mail size={16} />
            {userEmail}
          </Typography>
        </Box>
      </Box>

      {/* ID Chip */}
      <Chip
        label={`ID: ${userId}`}
        size="small"
        variant="outlined"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'white',
        }}
      />
    </Box>
  );
};

export default ProfileSection;
