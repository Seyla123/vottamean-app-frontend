import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { BootstrapDialog } from './BootstrapDialog';

const BaseModal = ({ open, onClose, title, children, actions }) => {
  return (
    <BootstrapDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </BootstrapDialog>
  );
};

export default BaseModal;
