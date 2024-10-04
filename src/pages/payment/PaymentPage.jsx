import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Load Stripe with your publishable key from environment variables
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISH_KEY ||
    'pk_test_51PmnGJP5alvD1Khwhij6kgfC3NLbVlt0LQUKId29TF1FaO4hjteGDr4GBU89ms1r5o2C9Q4PnYuP52atOsdi53MX00SKkdWpVB',
);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
