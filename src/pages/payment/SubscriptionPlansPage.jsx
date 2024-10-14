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
  Grid,
  useMediaQuery,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SubscriptionButton from './SubscriptionButton';
import CancelSubscription from './CancelSubscription';
import { useGetUserProfileQuery } from '../../services/userApi';
import FormComponent from '../../components/common/FormComponent';
import { grey } from '@mui/material/colors';
import { Leaf, Sprout, TreeDeciduous } from 'lucide-react';
import PricingPlanCard from '../../components/admin/PricingPlanCard';
import AccountUsagePanel from '../../components/admin/AccountUsagePanel';
import PlanComparison from '../../components/admin/PlanComparison';

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
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      icon: <Leaf size={24} />,
      monthlyPrice: '$0',
      yearlyPrice: '$0',
      description: 'Discover WaveTrack',
      features: [
        'Basic Reports',
        'Basic Attendance',
        'Basic Class',
        'Basic Subject',
        'Basic Student',
        'Basic Teacher',
        'Basic Account',
      ],
      isFree: true,
    },
    {
      type: 'Standard',
      icon: <Sprout size={24} />,
      monthlyPrice: '$3.99',
      yearlyPrice: '$39.99',
      description: 'Ideal for growing businesses',
      features: [
        'Advanced Reports',
        'Advanced Attendance',
        'Advanced Class',
        'Advanced Subject',
        'Advanced Student',
        'Advanced Teacher',
        'Advanced Account',
        'Advanced Reports',
      ],
      isFree: false,
    },
    {
      type: 'Premium',
      icon: <TreeDeciduous size={24} />,
      monthlyPrice: '$9.99',
      yearlyPrice: '$99.99',
      description: 'Built for school manager',
      features: [
        'Premium Reports',
        'Premium Attendance',
        'Premium Class',
        'Premium Subject',
        'Premium Student',
        'Premium Teacher',
        'Premium Account',
        'Premium Reports',
        'Premium Attendance',
        'Premium Class',
      ],
      isFree: false,
    },
  ];

  return (
    <FormComponent
      title={'My Subscription'}
      subTitle={'Upgrade your Marketing Platform'}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderColor: 'divider',
          }}
        >
          <TabList
            orientation={'horizontal'}
            variant="scrollable"
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ width: '100%' }}
          >
            <Tab label="Account usage" value="1" />
            <Tab label="Upgrade Plan" value="2" />
            <Tab label="Plan Comparison" value="3" />
          </TabList>
        </Box>

        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="1">
          <AccountUsagePanel
            plans={plans}
            currentSubscription={currentSubscription}
            isSubscriptionActive={isSubscriptionActive}
            setValue={setValue}
          />
        </TabPanel>

        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="2">
          <Box sx={{ width: '100%', py: 4 }}>
            <Typography variant="h4" textAlign={'center'} fontWeight={'bold'}>
              Upgrade Plan
            </Typography>
            {/* Tabs for switching between Monthly and Yearly billing cycles */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mx: 'auto',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  backgroundColor: grey[200],
                  zIndex: 10,
                  borderRadius: 2,
                  p: 1,
                  mt: 4,
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
                alignItems: 'start',
                gap: 3,
                mt: 14,
                mx: 'auto',
                width: '100%',
                maxWidth: '1000px',
              }}
            >
              <Grid container spacing={3}>
                {plans.map((plan) => (
                  <Grid item xs={12} sm={6} md={4} key={plan.type}>
                    <PricingPlanCard
                      plan={plan}
                      billingCycle={billingCycle}
                      adminId={adminId}
                      currentSubscription={currentSubscription}
                      isSubscriptionActive={isSubscriptionActive}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box mt={14}>
              <Typography variant="h4" textAlign={'center'} fontWeight={'bold'}>
                Cancel Subscription
              </Typography>
              <Typography variant="body1" textAlign={'center'} mt={2}>
                Cancel your Subscription
              </Typography>
              {/* Add the CancelSubscription component */}
              {isSubscriptionActive && <CancelSubscription adminId={adminId} />}
            </Box>
          </Box>
        </TabPanel>

        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="3">
          {/* Plan Comparison Table */}
          <PlanComparison plans={plans} />
        </TabPanel>
      </TabContext>
    </FormComponent>
  );
};

export default SubscriptionPlansPage;
