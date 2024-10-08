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
  Typography,
} from '@mui/material';
import DeleteIcon from '../../assets/icon/delete-icon.png';

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
 *       <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
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

const DeleteConfirmationModal = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={false}
      PaperProps={{
        style: {
          maxWidth: '500px',
          width: '100%',
          borderRadius: 8,
          padding: 8,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <img src={DeleteIcon} alt="delete icon" style={{ width: '60px' }} />
        <Typography variant="h5" fontWeight={'bold'} mt={2}>
          {'Delete Permenantly?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this {itemName}?
          <br />
          This action cannot be undone.
        </DialogContentText>
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
            <Button onClick={onClose} variant="text" size="large" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              color="error"
              variant="contained"
              size="large"
              fullWidth
              autoFocus
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
