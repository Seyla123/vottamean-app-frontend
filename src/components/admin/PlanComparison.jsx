import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import { Check, X } from 'lucide-react';
import { shadow } from '../../styles/global';

const PlanComparison = ({ plans }) => {
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features)),
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Typography variant="h5" py={4} fontWeight={'bold'}>
        Plan Comparison
      </Typography>
      {!isMobile ? (
        <>
          <Paper sx={{ width: '100%', margin: 'auto', boxShadow: shadow }}>
            <TableContainer>
              <Table aria-label="plan comparison table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" fontWeight={'bold'}>
                        Feature
                      </Typography>
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell key={plan.type} align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Box color={'primary.main'}>
                            {plan.icon}
                            <Typography variant="subtitle1" fontWeight={'bold'}>
                              {plan.type}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {plan.monthlyPrice}/month
                          </Typography>
                          <Typography variant="body2">
                            {plan.yearlyPrice}/year
                          </Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFeatures.map((feature, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {feature}
                      </TableCell>
                      {plans.map((plan) => (
                        <TableCell
                          key={`${plan.type}-${feature}`}
                          align="center"
                        >
                          {plan.features.includes(feature) ? (
                            <Check color="green" />
                          ) : (
                            <X color="red" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <Paper sx={{ width: '100%', margin: 'auto', boxShadow: shadow, p: 2 }}>
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <>
                <Grid item xs={6} key={plan.type}>
                  <Box color={'primary.main'}>
                    {plan.icon}
                    <Typography variant="subtitle1" fontWeight={'bold'}>
                      {plan.type}
                    </Typography>
                  </Box>{' '}
                  <Box>
                    <Typography variant="body2">
                      {plan.monthlyPrice}/month
                    </Typography>
                    <Typography variant="body2">
                      {plan.yearlyPrice}/year
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{plan.description}</Typography>
                  <Typography variant="h6" fontWeight={'bold'}>
                    {plan.features.length} Features
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default PlanComparison;
