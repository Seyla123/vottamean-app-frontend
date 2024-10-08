import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useCancelPaymentIntentMutation } from '../../services/paymentApi';

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
      <Typography variant="h6" gutterBottom>
        Cancel your Subscription
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCancel}
        disabled={isLoading}
      >
        {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
      </Button>
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
