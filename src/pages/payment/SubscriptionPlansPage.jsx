import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
} from '@mui/material';
import SubscriptionButton from './SubscriptionButton';
import CancelSubscription from './CancelSubscription';
import { useGetUserProfileQuery } from '../../services/userApi';

const SubscriptionPlansPage = () => {
  const { data: userData, isLoading } = useGetUserProfileQuery();
  const [billingCycle, setBillingCycle] = useState('monthly');

  if (isLoading) return <Typography>Loading...</Typography>;

  // Extract admin_id from user profile's adminProfile
  const adminId = userData?.data?.adminProfile?.admin_id;
  console.log('Admin ID in Subscription Plans Page:', adminId);

  // Extract current subscription details from backend
  const currentSubscription =
    userData?.data?.subscriptions?.[0]?.plan_type || 'None';
  const isSubscriptionActive =
    userData?.data?.subscriptions?.[0]?.status === 'active';

  // Define plan prices for Monthly and Yearly billing
  const plans = [
    {
      type: 'Basic',
      monthlyPrice: 'Free Trial',
      yearlyPrice: 'Free Trial',
      description: 'Access to basic features and support.',
      isFree: true,
    },
    {
      type: 'Standard',
      monthlyPrice: '$3.99/month',
      yearlyPrice: '$39.99/year',
      description: 'Standard features with more capacity and priority support.',
      isFree: false,
    },
    {
      type: 'Premium',
      monthlyPrice: '$9.99/month',
      yearlyPrice: '$99.99/year',
      description: 'All features and top-tier support for large institutions.',
      isFree: false,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Choose a Subscription Plan
      </Typography>

      {/* Tabs for switching between Monthly and Yearly billing cycles */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Tabs
          value={billingCycle}
          onChange={(e, value) => setBillingCycle(value)}
          textColor="primary"
          indicatorColor="primary"
          aria-label="billing cycle tabs"
        >
          <Tab value="monthly" label="Monthly Billing" />
          <Tab value="yearly" label="Yearly Billing" />
        </Tabs>
      </Box>

      {/* Display Subscription Plans */}
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
            key={plan.type}
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
                {plan.isFree
                  ? 'Free Trial'
                  : billingCycle === 'monthly'
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {plan.description}
              </Typography>
              {/* Show current subscription status */}
              {currentSubscription === plan.type.toLowerCase() &&
                isSubscriptionActive && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: 'success.main' }}
                  >
                    You are currently subscribed to this plan.
                  </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
              {/* Only show the SubscriptionButton if it's not a Free or Basic plan */}
              {!plan.isFree && (
                <SubscriptionButton
                  planType={plan.type}
                  adminId={adminId}
                  currentPlan={currentSubscription}
                  billingCycle={billingCycle}
                  isFree={plan.isFree}
                  isSubscribed={
                    currentSubscription === plan.type.toLowerCase() &&
                    isSubscriptionActive
                  }
                />
              )}
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Add the CancelSubscription component */}
      {isSubscriptionActive && (
        <Box>
          <Typography variant="h4" sx={{ mt: 4 }} gutterBottom align="center">
            Cancel your Subscription
          </Typography>
          <CancelSubscription adminId={adminId} />
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionPlansPage;
