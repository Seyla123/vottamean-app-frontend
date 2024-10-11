import React from 'react';
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  styled,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import { X } from 'lucide-react';
import viewImage from '../../assets/images/data-storage.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const ViewModal = ({ open, onClose, title, description, data }) => {
  const handleClose = () => {
    onClose();
  };

  const renderDataItems = () => {
    if (Array.isArray(data)) {
      return data.map((item, index) => {
        const [key, value] = Object.entries(item)[0];
        return (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={4}>
              <Chip
                icon={item.icon}
                label={key}
                sx={{
                  bgcolor: 'background.paper',
                  px: 1,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: key === 'description' ? '1.25rem' : '1rem',
                }}
              >
                {value !== null && value !== undefined
                  ? value.toString()
                  : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </React.Fragment>
        );
      });
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => (
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
      ));
    }
    return null;
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="view-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="edit-dialog-title">
        {title}
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component={'img'}
            src={viewImage}
            alt="View Image"
            style={{
              width: '240px',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Grid
          container
          spacing={1}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {renderDataItems()}
        </Grid>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} variant="contained" size="small">
          Close
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ViewModal;
