import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const RandomAvatar = ({ username, gender, size = 40 }) => {
  // Using Dicebear's "big-smile" style for gender-based avatars
  const avatarUrl = `https://api.dicebear.com/6.x/big-smile/svg?seed=${username}&gender=${gender}`;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={avatarUrl}
        alt={`Avatar for ${username}`}
        sx={{ width: size, height: size }}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {username}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {gender}
      </Typography>
    </Box>
  );
};

export default RandomAvatar;

// EXAMPLE USAGE
// const ExampleUsage = () => {
//   const users = [
//     { username: 'john_doe', gender: 'male' },
//     { username: 'jane_smith', gender: 'female' },
//     { username: 'sam_johnson', gender: 'male' },
//   ];

//   return (
//     <Box display="flex" justifyContent="space-around" p={2}>
//       {users.map((user) => (
//         <RandomAvatar
//           key={user.username}
//           username={user.username}
//           gender={user.gender}
//           size={64}
//         />
//       ))}
//     </Box>
//   );
// };

// export default ExampleUsage;
