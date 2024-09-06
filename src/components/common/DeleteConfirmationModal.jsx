import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import DeleteIcon from '../../assets/icon/delete-icon.png';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, itemName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            fullWidth={false}
            PaperProps={{
                style: {
                    width: '450px',
                    textAlign: 'center',
                },
            }}
        >
            <DialogContent>
                <img
                    src={DeleteIcon}
                    alt='delete icon'
                    style={{ width: '60px' }}
                />
                <DialogTitle id='alert-dialog-title'>
                    {'Are you sure?'}
                </DialogTitle>
                <DialogContentText id='alert-dialog-description'>
                    Do you really want to delete this {itemName}? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: 1,
                        gap: 2,
                        p: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant='outlined'
                        size='large'
                        fullWidth
                        sx={{ border: '1px solid black', color: 'black' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        color='error'
                        variant='contained'
                        size='large'
                        fullWidth
                        autoFocus
                    >
                        Delete
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
