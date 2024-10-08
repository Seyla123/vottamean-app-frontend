import React from 'react';
import {
  Button,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const ViewModal = ({ open, onClose, title, description, data }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Stack spacing={2} mt={2}>
          {data &&
            Object.entries(data).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong>{' '}
                {value !== null && value !== undefined
                  ? value.toString()
                  : 'N/A'}
              </Typography>
            ))}
          {!data && <Typography>No data available</Typography>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
