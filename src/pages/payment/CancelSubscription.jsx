import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useCancelPaymentIntentMutation } from '../../services/paymentApi';
import StyledButton from '../../components/common/StyledMuiButton';

function CancelSubscription({ adminId }) {
  const [cancelPaymentIntent, { isLoading, isSuccess, isError }] =
    useCancelPaymentIntentMutation();

  const handleCancel = async () => {
    try {
      // Pass adminId as an argument
      await cancelPaymentIntent({ admin_id: adminId }).unwrap();
    } catch (error) {
      console.error('Failed to cancel subscription: ', error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <StyledButton
        size="small"
        variant="outlined"
        onClick={handleCancel}
        disabled={isLoading}
      >
        {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
      </StyledButton>
      {isSuccess && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Subscription cancelled successfully!
        </Typography>
      )}
      {isError && (
        <Typography color="error.main" sx={{ mt: 2 }}>
          Failed to cancel subscription.
        </Typography>
      )}
    </Box>
  );
}

export default CancelSubscription;
