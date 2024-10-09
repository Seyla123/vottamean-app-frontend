import React from 'react';
import { Box, Typography, Avatar, Paper, Grid } from '@mui/material';
import { shadow } from '../../styles/global';
import StyledButton from '../common/StyledMuiButton';
import { Link } from 'react-router-dom';

const ShortcutCard = ({ title, description, icon, href }) => {
  return (
    <Paper sx={shadow}>
      <Box p={1} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Image */}
        <Box sx={{ width: '250px' }}>
          <img
            src={icon}
            alt="icon"
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Box>
        {/* Title and Description */}
        <
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: ' start',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Link to={href}>
            <StyledButton variant={'contained'} sx={{ mt: 3 }}>
              View Class
            </StyledButton>
          </Link>
        </>
      </Box>
    </Paper>
  );
};

export default ShortcutCard;
