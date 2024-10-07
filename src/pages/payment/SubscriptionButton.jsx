import React, { useState } from 'react';
import { useCreateCheckoutSessionMutation } from '../../services/paymentApi';
import { Button } from '@mui/material';

const SubscriptionButton = ({ planType, adminId }) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!adminId) {
      console.error('Admin ID is missing. Cannot proceed with checkout.');
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const { url } = await createCheckoutSession({
        plan_type: planType.toLowerCase(),
        admin_id: adminId,
      }).unwrap();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Failed to create checkout session', error);
      alert(
        'There was an error while creating the checkout session. Please try again.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      variant="contained"
      color="primary"
      disabled={isLoading || isProcessing}
    >
      {isLoading || isProcessing
        ? 'Processing...'
        : `Subscribe to ${planType} Plan`}
    </Button>
  );
};

export default SubscriptionButton;
