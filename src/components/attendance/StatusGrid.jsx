import React from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Card,
  Stack,
  CardContent,
  CardActions,
} from '@mui/material';
import theme from '../../styles/theme';
import { statusDetails } from '../../data/status';
import { shadow } from '../../styles/global';
import StyledButton from '../common/StyledMuiButton';

const StatusGrid = ({ statusCounts }) => {
  return (
    <>
      <Grid container spacing={2}>
        {statusDetails.map(({ icon: Icon, label, bgColor, color }, index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ boxShadow: shadow }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {label}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Box
                    sx={{
                      backgroundImage: bgColor,
                      width: 40,
                      height: 40,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color={color} />
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      {statusCounts[label]?.toString().padStart(2, '0') || ''}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StatusGrid;
