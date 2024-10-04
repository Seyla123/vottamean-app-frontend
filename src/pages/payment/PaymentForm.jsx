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

    // Create a payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

    if (paymentMethodError) {
      console.log('[Payment Method Error]', paymentMethodError);
      return;
    }

    // Create PaymentIntent on the server with the payment method ID
    const { data: paymentIntentData, error: paymentIntentError } =
      await createPaymentIntent({
        admin_id: '1', // Include admin ID if necessary
        plan_type: planType, // Ensure this is set correctly
        payment_method_id: paymentMethod.id, // This should be the payment method ID from Stripe
      });

    // Check for errors in the API call
    if (!paymentIntentData || paymentIntentError) {
      console.log('[Payment Intent Error]', paymentIntentError);
      return;
    }

    // Destructure client_secret from the response
    const { client_secret } = paymentIntentData;

    // Confirm the payment on the client
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      client_secret,
      {
<<<<<<< HEAD
        payment_method: paymentMethod.id,
=======
        payment_method: paymentMethod.id, // Use the payment method ID here
>>>>>>> b7e7e94 (feature : implement the subscription page)
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
