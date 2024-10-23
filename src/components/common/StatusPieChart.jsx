import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { statusDetails } from '../../data/status';
import { shadow } from '../../styles/global';

const StatusPieChart = ({ statusCounts }) => {
  // Transform the statusCounts data into the format required by PieChart
  const pieData = statusDetails.map((status, index) => ({
    id: index,
    value: statusCounts[status.label] || 0,
    label: status.label,
    color: status.color, // Use the existing color from statusDetails
  }));

  // Calculate total for percentage display
  const total = Object.values(statusCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  // Only render the chart if there's data
  if (total === 0) {
    return (
      <Card sx={{ boxShadow: shadow, height: '100%' }}>
        <CardContent>
          <Typography variant="h6" align="center">
            No data available
          </Typography>
          <Typography variant="body2" align="center">
            Go to the attendance list and mark attendance for each student.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ boxShadow: shadow, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Distribution
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
