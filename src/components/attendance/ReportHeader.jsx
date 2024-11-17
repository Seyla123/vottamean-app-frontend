import React from 'react';
import {  Grid } from '@mui/material';
import StatusGrid from './StatusGrid';
import StatusPieChart from '../common/StatusPieChart';

const ReportHeader = ({ data }) => {
  const dataCount =
    data.length === 0
      ? { Present: 0, Late: 0, Permission: 0, Absent: 0 }
      : data.reduce(
          (acc, { status, total }) => {
            acc[status.charAt(0).toUpperCase() + status.slice(1)] =
              total !== null && total !== undefined ? total : 0;
            return acc;
          },
          { Present: 0, Late: 0, Permission: 0, Absent: 0 },
        );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StatusGrid statusCounts={dataCount} />
        </Grid>
        <Grid item xs={12} md={6} >
          <StatusPieChart statusCounts={dataCount} />
        </Grid>
      </Grid>
    </>
  );
};

export default ReportHeader;
