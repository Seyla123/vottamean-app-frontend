import React from 'react';
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

const UpgradePlanPanel = () => {
  return (
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
            p: 0.8,
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
  );
};

export default UpgradePlanPanel;
