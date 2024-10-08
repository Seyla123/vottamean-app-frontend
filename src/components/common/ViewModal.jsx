import React from 'react';
import {
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import StyledButton from './StyledMuiButton';

const ViewModal = ({ open, onClose, title, data }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {data && Object.entries(data).map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {value !== null && value !== undefined ? value.toString() : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} variant="contained" color="primary">
          Close
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
