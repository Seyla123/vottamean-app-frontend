import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { PlusIcon } from 'lucide-react';
import { useViewListClassPeriodQuery } from '../../../services/classPeriodApi';
import { calculatePeriod } from '../../../utils/sortUtils';

function ClassPeriodListPage() {
  const { data, error, isLoading } = useViewListClassPeriodQuery();
  // Use navigate hook to handle routing
  const navigate = useNavigate();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Define table columns
  const columns = [
    { id: 'period_id', label: 'ID' },
    { id: 'start_time', label: 'Start Time' },
    { id: 'end_time', label: 'End Time' },
    { id: 'period', label: 'Period' }, // Uncomment if needed
  ];

  // Helper function to format time to 12-hour AM/PM
 
  const handleEdit = (row) => {
    navigate(`/dashboard/class-periods/update/${row.id}`);
  };
  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  const rows = data.data.map((item) => {
    const { period, formattedStart, formattedEnd } = calculatePeriod(
      item.start_time,
      item.end_time,
    );

    return {
      period_id: item.period_id,
      start_time: formattedStart, // AM/PM format
      end_time: formattedEnd, // AM/PM format
      period: period, // "Xh Xm" format
    };
  });
  // Columns to hide
  const hideColumns = ['start'];

  return (
    <FormComponent
      title={'Class Period List'}
      subTitle={`There are ${data.length} Class Periods`} // Dynamically show the number of periods
    >
      {/* Button to add a new class period */}
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/admin/class-periods/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD PERIOD
          </Button>
        </Link>
      </Stack>

      {/* Data table to display class periods */}
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={hideColumns}
        emptyTitle={'No Class Periods'}
        emptySubTitle={'No class periods available. Add some to see them here.'}
      />
    </FormComponent>
  );
}

export default ClassPeriodListPage;