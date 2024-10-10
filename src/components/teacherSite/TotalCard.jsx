import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Box, Grid, Typography } from '@mui/material';
import StyledButton from '../common/StyledMuiButton';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TotalCard = ({ amount }) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
      }}
    >
      {/* Grid container */}
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'flex-end' }}
      >
        {/* Title and amount */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Total Students
          </Typography>
          <Typography variant="body1" gutterBottom>
            {amount}
          </Typography>
          <Link to={''}>
            <StyledButton endIcon={<ArrowUpRight size={16} />} size="small">
              See all
            </StyledButton>
          </Link>
        </Grid>

        {/* People avatars */}
        <Grid item xs={12} sm={6}>
          <AvatarGroup max={5} total={amount}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1514355315815-2b64b0216b14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Avatar
              alt="Travis Howard"
              src="https://plus.unsplash.com/premium_photo-1663089667998-77622508cd27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://images.unsplash.com/photo-1698993026848-f67c1eb7f989?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </AvatarGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotalCard;
