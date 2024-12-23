import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import SubscriptionButton from './SubscriptionButton';
import { Check } from 'lucide-react';
const PricingPlanCard = ({
  plan,
  billingCycle,
  currentSubscription,
  isSubscriptionActive,
}) => {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Show current subscription status */}
      {currentSubscription === plan.type.toLowerCase() &&
        isSubscriptionActive && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              zIndex: 1,
              width: '100%',
              p: 1,
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Typography variant="h6" textAlign={'center'}>
              Your Current Plan
            </Typography>
          </Box>
        )}
      <Card
        sx={{
          boxShadow: 3,
          border: '2px solid',
          borderColor: 'primary.main',
          height: '100%',
          borderRadius: 2,
          py: 2,
        }}
      >
        <Box
          sx={{ p: 3, borderColor: 'primary.main' }}
        >
          <Typography
            variant="h5"
            display={'flex'}
            alignItems={'center'}
            gap={1}
            fontWeight={'500'}
            color="primary.main"
          >
            {plan.icon} {plan.type}
          </Typography>
          <Typography variant="body1" mt={1}>
            {plan.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} mt={4}>
            <Typography variant="h4" fontWeight={'bold'}>
              {plan.isFree
                ? '$0'
                : billingCycle === 'monthly'
                  ? plan.monthlyPrice
                  : plan.yearlyPrice}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {billingCycle === 'monthly' ? '/ per month' : '/ per year'}
            </Typography>
          </Box>
          <Box width={'100%'} height={'50px'} mt={8}>
            {/* Only show the SubscriptionButton if it's not a Free or Basic plan */}
            {!plan.isFree && (
              <SubscriptionButton
                planType={plan.type}
                billingCycle={billingCycle}
                isFree={plan.isFree}
                isSubscribed={
                  currentSubscription === plan.type.toLowerCase() &&
                  isSubscriptionActive
                }
              />
            )}
          </Box>
        </Box>
        <Divider sx={{borderBottomWidth: '2.5px', borderRadius: '5px', borderColor: 'primary.main', mx: 4}}/>
        <CardContent sx={{ height: '100%' }}>
          <Typography variant="body1" fontWeight={'bold'}>
            Everything in{' '}
            {plan.type === 'Basic'
              ? 'Basic'
              : plan.type === 'Standard'
                ? 'Standard'
                : 'Premium'}{' '}
            :
          </Typography>
          {plan.features.map((feature, index) => (
            <Typography
              variant="body1"
              mt={2}
              display={'flex'}
              alignItems={'center'}
              gap={2}
              key={index}
            >
              <Check size={18} color="green" />
              {feature}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PricingPlanCard;

