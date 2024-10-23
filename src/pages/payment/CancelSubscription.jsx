import React, { useEffect } from 'react';
import { useCancelPaymentIntentMutation } from '../../services/paymentApi';
import { useGetUserProfileQuery } from '../../services/userApi';
import StyledButton from '../../components/common/StyledMuiButton';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';
import { BootstrapDialog } from '../../components/common/BootstrapDialog';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Stack,
  Alert,
  Typography
} from '@mui/material';
import { X } from 'lucide-react';
function CancelSubscription({ adminId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [cancelPaymentIntent, { isLoading, isSuccess, isError, error }] =
    useCancelPaymentIntentMutation();
  const { refetch } = useGetUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSnackbar({ open: true, message: 'Subscription cancelled successfully', severity: 'success' }));
      refetch();
    } else if (isError) {
      dispatch(setSnackbar({ open: true, message: error?.data?.message || 'Failed to cancel subscription', severity: 'error' }));
    }
  }, [isSuccess, isError, error, dispatch]);
  const handleCancel = async () => {
    // Pass adminId as an argument
    await cancelPaymentIntent({ admin_id: adminId }).unwrap();
  };

  return (
    <>
      <StyledButton disabled={isLoading} sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.light' } }} variant="contained" type="submit" size="small" onClick={() => setOpen(true)}>
        Cancel Subscription
      </StyledButton>
      <CancelSubscriptionModal isLoading={isLoading} open={open} onClose={() => setOpen(false)} onCancel={handleCancel} />
    </>
  );
}
const CancelSubscriptionModal = ({ open, onClose, onCancel, isLoading }) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="cancel-subscription-dialog-title"
    >
      <DialogTitle id="cancel-subscription-dialog-title">
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          Cancel Subscription?
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
      <DialogContent dividers>
        <Stack justifyContent={'center'} gap={2}>
          <Typography variant='body1'>
            Are you sure you want to cancel your subscription?
          </Typography>
          <Alert severity="error">
            This action cannot be undone and you will no longer have access to the current features.
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions >
        <StyledButton
          size="small"
          onClick={onClose}
          variant="text"
        >
          Keep Plan
        </StyledButton>

        <StyledButton
          onClick={onCancel}
          color="error"
          size="small"
          variant="contained"
          disabled={isLoading}
          autoFocus
        >
          {isLoading ? 'Canceling...' : 'Cancel Subscription'}
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
};
export default CancelSubscription;

