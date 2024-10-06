import { baseApi } from './baseApi';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch existing payments (already defined)
    getPayment: builder.query({
      query: () => ({
        url: 'payments',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Payments'],
    }),

    // Define the Stripe endpoint to create a payment intent
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: 'payments/create-payment-intent',
        method: 'POST',
        body: paymentData,
      }),
    }),

    // Define the Stripe endpoint to create a checkout session
    createCheckoutSession: builder.mutation({
      query: (sessionData) => ({
        url: 'payments/create-checkout-session',
        method: 'POST',
        body: sessionData,
      }),
    }),

    // Define the Stripe endpoint to cancel a payment intent
    cancelPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: 'payments/cancel-subscription',
        method: 'POST',
        body: paymentData,
      }),
    }),
  }),
});

// Export the hooks for the custom endpoints
export const {
  useGetPaymentQuery,
  useCreatePaymentIntentMutation,
  useCreateCheckoutSessionMutation,
  useCancelPaymentIntentMutation,
} = paymentApi;
