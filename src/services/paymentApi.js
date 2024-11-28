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

    // Define the Stripe endpoint to create a checkout session
    createCheckoutSession: builder.mutation({
      query: (sessionData) => ({
        url: 'payments/checkout',
        method: 'POST',
        body: sessionData,
      }),
      providesTags: ['Payments'],
    }),

    // get session data from Stripe
    getSessionDetails: builder.query({
      query: (sessionId) => ({
        url: `payments/checkout/sessions/${sessionId}`,
        method: 'GET',
        credentials: 'include',
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
    providesTags: ['Payments'],
  }),
});

// Export the hooks for the custom endpoints
export const {
  useGetPaymentQuery,
  useCreatePaymentIntentMutation,
  useCreateCheckoutSessionMutation,
  useCancelPaymentIntentMutation,
  useGetSessionDetailsQuery
} = paymentApi;
