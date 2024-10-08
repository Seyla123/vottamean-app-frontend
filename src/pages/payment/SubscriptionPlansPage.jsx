import React from 'react';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import SubscriptionButton from './SubscriptionButton';
import CancelSubscription from './CancelSubscription';
import PaymentPage from './PaymentPage';
import { useGetUserProfileQuery } from '../../services/userApi';

const SubscriptionPlansPage = () => {
  const { data: userData } = useGetUserProfileQuery();

  console.log('User Data SUB :', userData?.data?.subscriptions[0].plan_type);

  // Get admin_id from user profile's adminProfile
  const adminId = userData?.data?.adminProfile?.admin_id;
  console.log('Admin ID For Stripe Payemnt:', adminId);

  const plans = [
    { type: 'Monthly', price: '$9.99/month', id: 1 },
    { type: 'Yearly', price: '$69.99/year', id: 2 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Choose a Subscription Plan
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {plans.map((plan) => (
          <Card
            key={plan.id}
            sx={{
              minWidth: 300,
              border: '1px solid #ccc',
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                borderColor: 'primary.main',
              },
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h5">{plan.type} Plan</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                {plan.price}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Details about the {plan.type} plan. Enjoy great features and
                benefits!
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
              <SubscriptionButton planType={plan.type} adminId={adminId} />
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Include the PaymentPage component for payment handling */}
      <Typography variant="h4" sx={{ mt: 4 }} gutterBottom align="center">
        Testing the Custom UI Payment
      </Typography>
      <PaymentPage />

      {/* Add the CancelSubscription component */}
      <Typography variant="h4" sx={{ mt: 4 }} gutterBottom align="center">
        Cancel your Subscription
      </Typography>
      <CancelSubscription adminId={adminId} />
    </Box>
  );
};

export default SubscriptionPlansPage;
