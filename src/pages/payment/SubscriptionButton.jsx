import React from 'react';
import { useCreateCheckoutSessionMutation } from '../../services/paymentApi';

const SubscriptionButton = ({ planType, adminId }) => {
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    try {
      const { url } = await createCheckoutSession({
        plan_type: planType.toLowerCase(),
        admin_id: adminId,
      }).unwrap();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      // Handle error (e.g., show a message to the user)
      console.error('Failed to create checkout session', error);
    }
  };

  return <button onClick={handleCheckout}>Subscribe to {planType} Plan</button>;
};

export default SubscriptionButton;
