import React from 'react';
import {
  Typography,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Chip,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { BootstrapDialog } from './BootstrapDialog';
import viewImage from '../../assets/images/data-storage.svg';
import StyledButton from './StyledMuiButton';

const ViewModal = ({ open, onClose, title, description, data }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderDataItems = () => {
    return data?.map((item, index) => {
      const [key, value] = Object.entries(item)[0];
      return (
        <List sx={style} key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  {item.icon}
                  <ListItemText primary={key} />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItemText
                  primary={
                    key === 'Status' ? (
                      value ? (
                        <Chip
                          size="small"
                          sx={{ backgroundColor: '#E0FBE2' }}
                          icon={
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: '#06D001',
                              }}
                            />
                          }
                          label="Active"
                        />
                      ) : (
                        <Chip
                          size="small"
                          sx={{ backgroundColor: '#FFF2F2' }}
                          icon={
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: '#F95454',
                              }}
                            />
                          }
                          label="Active"
                        />
                      )
                    ) : value !== null && value !== undefined ? (
                      value.toString()
                    ) : (
                      'N/A'
                    )
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      );
    });
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      aria-labelledby="view-dialog-title"
    >
      <DialogTitle id="view-dialog-title" sx={{ m: 0, p: 2, pr: 6 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack direction="column" alignItems="center" sx={{ mb: 2 }}>
          <Box
            component="img"
            src={viewImage}
            alt="View Image"
            sx={{
              width: '240px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Stack>

        {renderDataItems()}
      </DialogContent>

      <DialogActions>
        <StyledButton onClick={onClose} variant="contained" size="small">
          Close
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
};
const style = {
  py: 0,
  width: '100%',
  borderBottom: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export default ViewModal;
