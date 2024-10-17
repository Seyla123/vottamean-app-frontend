import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import DeleteIcon from '../../assets/icon/delete-icon.png';
import { X } from 'lucide-react';

/**
 * DeleteConfirmationModal - A reusable Material-UI based modal for confirming delete actions.
 *
 * Usage:
 * import DeleteConfirmationModal from './path/to/DeleteConfirmationModal';
 *
 * function YourComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   const handleDelete = () => {
 *     // Perform delete action
 *     setIsOpen(false);
 *   };
 *
 *   return (
 *     <>
 *       <StyledButton onClick={() => setIsOpen(true)}>Delete Item</StyledButton>
 *       <DeleteConfirmationModal
 *         open={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         onConfirm={handleDelete}
 *         itemName="Example Item"
 *       />
 *     </>
 *   );
 * }
 *
 * Props:
 * @param {boolean} open - Controls the visibility of the modal
 * @param {function} onClose - Function to call when the modal should be closed
 * @param {function} onConfirm - Function to call when the delete action is confirmed
 * @param {string} itemName - Name of the item to be deleted
 */

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

const DeleteConfirmationModal = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="delete-dialog-title">
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <img src={DeleteIcon} alt="delete icon" style={{ width: '60px' }} />
          Delete Permenantly?
        </Box>
      </DialogTitle>
      <IconButton
        onClick={onClose}
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
        <Typography variant="body1" color="text.secondary">
          Do you really want to delete this <b>{itemName}</b>? <br />
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}></Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <StyledButton
              onClick={onClose}
              variant="text"
              fullWidth
            >
              Cancel
            </StyledButton>
            <StyledButton
              onClick={onConfirm}
              color="error"
              variant="contained"
              fullWidth
              autoFocus
            >
              Delete
            </StyledButton>
          </Grid>
        </Grid>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteConfirmationModal;
