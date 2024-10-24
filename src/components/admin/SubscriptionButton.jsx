import React, { useState } from 'react';
import { useCreateCheckoutSessionMutation } from '../../services/paymentApi';
import StyledButton from '../../components/common/StyledMuiButton';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';
const SubscriptionButton = ({
  planType,
  billingCycle,
  isFree,
  isSubscribed,
}) => {
  const dispatch = useDispatch();

  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (isProcessing) return;


    try {
      // Create checkout session for both new subscriptions and renewals
      const formattedPlanType = planType.toLowerCase();
      const { url } = await createCheckoutSession({
        plan_type: formattedPlanType,
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
      dispatch(
        setSnackbar({
          open: true,
          message:
            'There was an error while creating the checkout session. Please try again.',
          severity: 'error',
        }),
      );
    } 
  };

  return (
    <StyledButton
      onClick={handleCheckout}
      variant="contained"
      size="small"
      disabled={isLoading }
      sx={{ width: '100%' }}
    >
      {isLoading 
        ? 'Processing...'
        : isSubscribed
          ? `Extend ${planType}`
          : isFree
            ? 'Activate Free Trial'
            : `Upgrade to ${planType}`}
    </StyledButton>
  );
};

export default SubscriptionButton;
