import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../services/paymentApi';
import { useGetUserProfileQuery } from '../../services/userApi';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading, isSuccess }] =
    useCreatePaymentIntentMutation();

  const { data: userData } = useGetUserProfileQuery();

  // Get admin_id from user profile's adminProfile
  const adminId = userData?.data?.adminProfile?.admin_id;
  console.log('Admin ID:', adminId);

  const [planType, setPlanType] = useState('monthly');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !adminId) {
      console.error('Stripe or elements not loaded, or admin ID missing');
      return;
    }

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

    // Create PaymentIntent on the server with the payment method ID and admin_id
    const { data: paymentIntentData, error: paymentIntentError } =
      await createPaymentIntent({
        admin_id: adminId,
        plan_type: planType,
        payment_method_id: paymentMethod.id,
      });

    console.log('Payment Method ID :', paymentMethod.id);
    console.log('Plan Type :', planType);
    console.log('Payment Data :', paymentIntentData);

    if (paymentIntentError) {
      console.log('[Payment Intent Error]', paymentIntentError);
      return;
    }

    // Destructure client_secret from the response
    const { client_secret } = paymentIntentData;

    // Confirm the payment on the client
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: paymentMethod.id,
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
