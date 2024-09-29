<<<<<<< HEAD
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Load Stripe with your publishable key from environment variables
const stripePromise = loadStripe(
  import.meta.env.PROD
    ? import.meta.env.VITE_STRIPE_PUBLISH_KEY_PROD
    : import.meta.env.VITE_STRIPE_PUBLISH_KEY,
);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
=======
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../services/paymentApi';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading, isSuccess }] =
    useCreatePaymentIntentMutation();

  const [planType, setPlanType] = useState('monthly');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get card details from Stripe's CardElement
    const cardElement = elements.getElement(CardElement);

    // Create PaymentIntent on the server
    const { data: paymentIntentData } = await createPaymentIntent({
      plan_type: planType,
      payment_method_id: cardElement.id,
    });

    if (!paymentIntentData || !stripe) return;

    const { client_secret } = paymentIntentData;

    // Confirm the payment on the client
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Your Name',
          },
        },
      },
    );

    if (error) {
      console.log('[Payment error]', error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose Plan:
        <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
          <option value="monthly">Monthly - $10</option>
          <option value="yearly">Yearly - $100</option>
        </select>
      </label>

      {/* Stripe Card Element */}
      <CardElement />

      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : 'Submit Payment'}
      </button>

      {isSuccess && <p>Payment Successful!</p>}
    </form>
  );
};

export default PaymentForm;
>>>>>>> da09177 (feature : create payment api)
