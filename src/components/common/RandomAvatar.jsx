import React, { useEffect } from 'react';
import { Avatar, Box } from '@mui/material';

const RandomAvatar = ({ username, gender, size = 40 }) => {
  const getAvatarStyle = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return 'avataaars';
      case 'female':
        return 'lorelei';
      default:
        return 'bottts';
    }
  };

  const avatarStyle = getAvatarStyle(gender);
  const randomParam = Math.random().toString(36).substring(7);
  const avatarUrl = `https://api.dicebear.com/6.x/${avatarStyle}/svg?seed=${encodeURIComponent(username)}&r=${randomParam}`;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={avatarUrl}
        alt={`Avatar for ${username}`}
        sx={{
          width: size,
          height: size,
          bgcolor: '#eee',
        }}
      />
    </Box>
  );
};

export default RandomAvatar;
