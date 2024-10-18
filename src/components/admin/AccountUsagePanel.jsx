import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { shadow } from '../../styles/global';
import StyledButton from '../common/StyledMuiButton';
import { CheckCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import AlertCard from '../common/AlertCard';
import creditCardImage from '../../assets/images/credit-card.svg';
import { Link } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const AccountUsagePanel = ({
  plans,
  currentSubscription,
  isSubscriptionActive,
  setValue,
}) => {
  console.log(currentSubscription);
  console.log(isSubscriptionActive);
  console.log(plans);

  const activePlan = plans.find(
    (plan) => plan.type.toLowerCase() === currentSubscription,
  );
  console.log('active', activePlan);

  return (
    <Box>
      <Typography variant="h5" py={4} fontWeight={'bold'}>
        Account Usage
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <UsageCard activePlan={activePlan} setValue={setValue} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Stack spacing={3}>
            {activePlan && <SubcriptionCard />}
            <Card sx={shadow}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  You need some help to know the right plan that fits your
                  needs?
                  <br />
                  Please let our support team answer you.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Link to="contact">
                  <StyledButton size="small">Contact Our Support</StyledButton>
                </Link>
              </CardActions>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const UsageCard = ({ activePlan, setValue }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const usagePercentage = 25; // Example usage percentage

  const visibleFeatures = showAllFeatures
    ? activePlan.features
    : activePlan.features.slice(0, 4);

  return (
    <Card sx={shadow}>
      <CardContent>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
        >
          <Typography variant="h6" gutterBottom>
            Your Plan Details
          </Typography>
          <Chip label={activePlan.type} size="small" color="primary" />
        </Box>
        <Grid container spacing={2} mt={2}>
          {visibleFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography
                variant="body2"
                display={'flex'}
                alignItems={'center'}
                gap={1}
                fontWeight={'500'}
              >
                <CheckCircle size={18} color="green" />
                {feature}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {activePlan.features.length > 4 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <StyledButton
              size="small"
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              endIcon={
                showAllFeatures ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )
              }
            >
              {showAllFeatures ? 'See Less' : 'See More'}
            </StyledButton>
          </Box>
        )}
        <Stack spacing={3}>
          <Box mt={3}>
            <Typography variant="body2" gutterBottom>
              Usage
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={usagePercentage}
            />
            <Typography variant="body2" textAlign="right" mt={3}>
              {usagePercentage}% of {activePlan.type} plan used
            </Typography>
          </Box>
          {usagePercentage < 80 && (
            <AlertCard
              title={'Unlock More Features'}
              description="Upgrade your plan to access advanced tools and increase your productivity. Our higher-tier plans offer extended limits and exclusive features to help your business grow."
              severity="info"
              icon={<Info size={18} />}
            />
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <StyledButton
          size="small"
          variant="outlined"
          onClick={() => setValue('2')}
        >
          Upgrade your plan
        </StyledButton>
      </CardActions>
    </Card>
  );
};

const SubcriptionCard = () => {
  return (
    <Card sx={{ height: '100%', boxShadow: shadow }}>
      <CardContent>
        <Stack>
          <Typography variant="h6">Subcription</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={creditCardImage}
              alt="credit card"
              sx={{ width: '240px', objectFit: 'contain' }}
            />
          </Box>

          <Typography variant="body1" textAlign={'center'}>
            Your subscription is currently <b>active</b>.
            <br /> You can cancel anytime.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AccountUsagePanel;
