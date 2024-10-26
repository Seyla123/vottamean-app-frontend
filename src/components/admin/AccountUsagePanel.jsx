import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
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
import CreditCardImage from '../../assets/images/credit-card.svg';
import NoSubscriptionIamge from '../../assets/images/online-pay.png';
import CancelSubscription from './CancelSubscription';
import { useGetPaymentQuery } from '../../services/paymentApi';

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

  const [subscritionDetails, setSubscritionDetails] = useState({});

  const { data, isLoading, isSuccess, isError } = useGetPaymentQuery();

  useEffect(()=>{
    if(data){
      setSubscritionDetails(data.data.subscription);
    }
  },[data, isLoading])

  console.log('this subscription data', subscritionDetails);
  

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
          {currentSubscription === 'None' ?
            <NoSubscription setValue={setValue} />
            :
            <UsageCard activePlan={activePlan} setValue={setValue} subscritionDetails={subscritionDetails}/>}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Stack spacing={3}>
            {activePlan && <SubcriptionCard/>}
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
                <StyledButton
                  size="small"
                  onClick={() => window.location.assign('mailto:wavetrack.app@gmail.com')}
                >
                  Contact Our Support
                </StyledButton>
              </CardActions>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const UsageCard = ({ activePlan, setValue, subscritionDetails }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const studentPercentage = subscritionDetails?.percentageStudentLimit;
  const teacherPercentage = subscritionDetails?.percentageTeacherLimit;


  const visibleFeatures = showAllFeatures
    ? activePlan?.features
    : activePlan?.features.slice(0, 4);

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
          <Chip label={subscritionDetails?.planType} size="small" color="primary" />
        </Box>
        <Grid container spacing={2} mt={2}>
          {visibleFeatures?.map((feature, index) => (
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
        {activePlan?.features?.length > 4 && (
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
              Student Usage
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={studentPercentage}
            />
            <Typography variant="body2" textAlign="right" mt={3}>
              {studentPercentage}% of {activePlan.type} plan used
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="body2" gutterBottom>
              Teacher Usage
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={teacherPercentage}
            />
            <Typography variant="body2" textAlign="right" mt={3}>
              {teacherPercentage}% of {activePlan.type} plan used
            </Typography>
          </Box>
          {teacherPercentage < 80 && (
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
const NoSubscription = ({ setValue }) => {
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
            You have not subscribed yet
          </Typography>
          <Chip label={'No Subscription'} size="small" color="primary" />
        </Box>

        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={NoSubscriptionIamge}
              alt="credit card"
              sx={{ width: '300px', objectFit: 'contain' }}
            />
          </Box>
          <AlertCard
            title={'Subscription Required'}
            description="We wanted to remind you that your account isn’t subscribed. Please select a plan to ensure continued access. We’ll temporarily disable accounts without a subscription soon."
            severity="warning"
            icon={<Info size={18} />}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <StyledButton
          size="small"
          variant="outlined"
          onClick={() => setValue('2')}
        >
          Upgrade to pro
        </StyledButton>
      </CardActions>
    </Card>
  );
};

const SubcriptionCard = () => {
  return (
    <Card sx={{ height: '100%', boxShadow: shadow }}>
      <CardContent sx={{ display:'flex', flexDirection: 'column', gap: 2 }}>
        <Stack> 
          <Typography variant="h6">Subcription</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={CreditCardImage}
              alt="credit card"
              sx={{ width: '240px', objectFit: 'contain' }}
            />
          </Box>
          <Stack gap={1}>
          <Typography variant="body1" textAlign={'center'}>
            Your subscription is currently <b>active</b>.
            <br /> You can cancel anytime.
          </Typography>
          <CancelSubscription/>
          </Stack>
        </Stack>


      </CardContent>
    </Card>
  );
};

export default AccountUsagePanel;
