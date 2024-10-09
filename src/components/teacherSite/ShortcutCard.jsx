import React from 'react';
import { Box, Typography, Avatar, Paper, Grid } from '@mui/material';
import { shadow } from '../../styles/global';
import StyledButton from '../common/StyledMuiButton';
import { Link } from 'react-router-dom';

const ShortcutCard = ({ title, description, icon, href, buttonText }) => {
  return (
    <Paper sx={shadow}>
      <Box p={3} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Image */}
        <Box sx={{ width: '250px', display: { xs: 'none', md: 'block' } }}>
          <img
            src={icon}
            alt="icon"
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Box>
        {/* Title and Description */}
        <Box
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
              {buttonText}
            </StyledButton>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default ShortcutCard;
