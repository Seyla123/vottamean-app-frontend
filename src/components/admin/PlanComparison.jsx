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
} from '@mui/material';
import { Check, X } from 'lucide-react';
import { shadow } from '../../styles/global';

const PlanComparison = ({ plans }) => {
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features)),
  );

  return (
    <Paper sx={{ width: '100%', margin: 'auto', boxShadow: shadow }}>
      <Typography variant="h4" sx={{ p: 2 }}>
        Plan Comparison
      </Typography>
      <TableContainer>
        <Table aria-label="plan comparison table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.type} align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {plan.icon}
                    <Typography variant="subtitle1">{plan.type}</Typography>
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
                key={feature}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                }}
              >
                <TableCell component="th" scope="row">
                  {feature}
                </TableCell>
                {plans.map((plan) => (
                  <TableCell key={`${plan.type}-${feature}`} align="center">
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
  );
};

export default PlanComparison;
