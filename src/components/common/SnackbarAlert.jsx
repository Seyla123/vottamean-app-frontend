import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * SnackbarAlert Component
 *
 * A reusable component for displaying alert messages using MUI's Snackbar and Alert.
 *
 * @param {Object} props
 * @param {boolean} props.open - Controls the visibility of the Snackbar
 * @param {function} props.handleClose - Function to call when closing the Snackbar
 * @param {string} props.message - The message to display in the Alert
 * @param {string} [props.severity='info'] - The severity of the Alert ('error', 'warning', 'info', 'success')
 * @param {number} [props.duration=6000] - The duration (in ms) to show the Snackbar
 */
const SnackbarAlert = ({
  open,
  handleClose,
  message,
  severity = 'info',
  duration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;

/**
 * Usage Example:
 *
 * import React, { useState } from 'react';
 * import SnackbarAlert from './SnackbarAlert';
 *
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 *
 *   const handleClose = () => setOpen(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Show Alert</button>
 *       <SnackbarAlert
 *         open={open}
 *         handleClose={handleClose}
 *         message="This is an alert message!"
 *         severity="success"
 *       />
 *     </>
 *   );
 * };
 */
