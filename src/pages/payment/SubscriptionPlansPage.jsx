import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  styled,
} from '@mui/material';
import SubscriptionButton from './SubscriptionButton';
import CancelSubscription from './CancelSubscription';
import { useGetUserProfileQuery } from '../../services/userApi';
import FormComponent from '../../components/common/FormComponent';
import { grey } from '@mui/material/colors';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    width: '100%',
    margin: 0,
    backgroundColor: 'white',
    zIndex: '-1',
    height: '100%',
    color: '#6c63ff',
    borderRadius: 8,
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    borderRadius: 10,
    display: 'flex',
    marginRight: 0,

    justifyContent: 'center',

    '&.Mui-selected': {
      color: theme.palette.text.primary.main,
      backgroundColor: theme.palette.background.default,
    },
  }),
);

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
    <FormComponent
      title={'My Subscription'}
      subTitle={'Upgrade your Marketing Platform'}
      sx={{ p: 4 }}
    >
      {/* Tabs for switching between Monthly and Yearly billing cycles */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mx: 'auto' }}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: grey[200],
            zIndex: 10,
            borderRadius: 4,
            p: 1,
          }}
        >
          <StyledTabs
            value={billingCycle}
            onChange={(e, value) => setBillingCycle(value)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="billing cycle tabs"
          >
            <StyledTab value="monthly" label="Monthly" />
            <StyledTab value="yearly" label="Yearly (Save 10%)" />
          </StyledTabs>
        </Box>
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
    </FormComponent>
  );
};

export default SubscriptionPlansPage;
