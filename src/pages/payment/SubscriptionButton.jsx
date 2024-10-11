import React, { useState } from 'react';
import { useCreateCheckoutSessionMutation } from '../../services/paymentApi';
import { Button } from '@mui/material';

const SubscriptionButton = ({
  planType,
  adminId,
  currentPlan,
  billingCycle,
  isFree,
  isSubscribed,
}) => {
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
      // Handle free plan directly (Basic)
      if (isFree) {
        alert('You are now subscribed to the free trial of the Basic Plan.');
        setIsProcessing(false);
        return;
      }

      // Create checkout session for both new subscriptions and renewals
      const formattedPlanType = planType.toLowerCase();
      const { url } = await createCheckoutSession({
        plan_type: formattedPlanType,
        admin_id: adminId,
        duration: billingCycle,
        isRenewing: isSubscribed,
      }).unwrap();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        console.error('Received undefined URL from createCheckoutSession.');
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
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
        : isSubscribed
          ? `Extend ${planType} Plan`
          : isFree
            ? 'Activate Free Trial'
            : `Subscribe to ${planType} Plan`}
    </Button>
  );
};

export default SubscriptionButton;
